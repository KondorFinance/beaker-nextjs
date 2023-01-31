import { Button,  Spacer, Text, Container, Card, Grid, Input, Image, useInput, Loading, Modal, Divider} from '@nextui-org/react'
import { Asset } from '../../config/Assets'
import { config } from '../../config'
import AssetSelect from '../../src/components/AssetSelect/AssetSelect'
import { useEffect, useState } from 'react'
import { useWallet } from '../../src/contexts/useWallet'
import { Balance } from '../../src/services/algoService'
import { microToStandard } from '../../src/utils/math'
import { swap } from '../../src/services/kondorServices/pondServise'
import { abbreviateTransactionHash, copyToClipboard } from '../../src/utils/utils'
import { ClipboardIcon } from '../../public/icons/clipboard'
import { IconButton } from '../../src/components/IconButton/IconButton'

export default function Swap() {
    const [ assetToSell, setAssetToSell ] = useState<Asset>(config.assetList[0])
    const [ assetToBuy, setAssetToBuy ] = useState<Asset>(config.assetList[1])
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ swapResultModalVisible, setSwapResultModalVisible ] = useState<boolean>(false)
    const [ balanceToSell, setBalanceToSell ] = useState<number>(0)
    const [ balanceToBuy, setBalanceToBuy ] = useState<number>(0)
    const [ amountToSell, setAmountToSell ] = useState<number>(0)
    const [ swapTransactionId, setSwapTransactionId ] = useState<string>("")
    const { isConnected, balances, account } = useWallet()
    const fromInput = useInput("");
    const toInput = useInput("");

    useEffect(() => {
        if(fromInput.value !== ""){
            const amount = Number(fromInput.value)
            if(amount > 0){
                setAmountToSell(amount)
            }
        }
    }, [fromInput.value])

    const handleSellAssetSelect = (asset: Asset) => asset ===  assetToBuy ? 
        (setAssetToBuy(assetToSell), setAssetToSell(asset)) : 
        setAssetToSell(asset)

    const handleBuyAssetSelect = (asset: Asset) => asset === assetToSell ? 
        (setAssetToSell(assetToBuy), setAssetToBuy(asset)) : 
        setAssetToBuy(asset)

    const handleCentralButton = () => {
        const assetToBuyTemp: Asset = assetToBuy
        setAssetToBuy(assetToSell)
        setAssetToSell(assetToBuyTemp)
    }

    const openResultModal = (txId: string) => {
        console.log("Entre al open result")
        setSwapTransactionId(txId)
        setSwapResultModalVisible(true)
    }

    const closeModalHandler = () => {
        setSwapResultModalVisible(false);
      };



    const handleSwap = async () => {
        if(fromInput.value !== ""){
            const amount = Number(fromInput.value)
            if(amount > 0){
                setLoading(true)
                try{
                    const result = await swap(account.addr, account.sk, amountToSell, assetToSell.id, assetToBuy.id)
                    setLoading(false)
                    if(result){
                        fromInput.setValue("")
                        toInput.setValue("")
                        openResultModal(result.txId)
                    }
                }
                catch(e){
                    setLoading(false)
                    console.log(e)
                }
            }
        }
    }


    useEffect(() => {
        if(isConnected){
            setBalanceToSell(0)
            setBalanceToBuy(0)
            balances.forEach((b: Balance) => {
                if(b.assetId === assetToSell.id) setBalanceToSell(microToStandard(b.amount))
                if(b.assetId === assetToBuy.id) setBalanceToBuy(microToStandard(b.amount))
            })
        }else{
            setBalanceToSell(0)
            setBalanceToBuy(0)
        }
    }, [assetToSell, assetToBuy, isConnected])

    return (
        <Container fluid display='flex' justify='center' alignItems='center' css={{minHeight: "85vh"}}>
                <Card css={{ mw: "330px", margin: "20px" }}>
                <Card.Header>
                    <Text b>Swap</Text>
                </Card.Header>
                <Container display='flex' justify='center' css={{padding:"10px"}}>
                    <Card css={{ $$cardColor: '$colors$gray100' }}>
                        <Card.Body>
                        <Grid.Container justify="center" css={{padding: "12px 0 0 0"}}>
                            <Grid xs={8}>
                                <Input {...fromInput.bindings} label="From" underlined placeholder='0.00' />
                            </Grid>
                            <Grid>
                               <AssetSelect asset={assetToSell} onPress={handleSellAssetSelect} />
                            </Grid>
                            <Container display='flex' justify='flex-start' css={{padding:0}}>
                                <Text size={14} color={"$secondary"}>Balance {balanceToSell} {assetToSell.symbol}</Text>                                
                            </Container>
                        </Grid.Container>
                        </Card.Body>
                    </Card>
                    <Button
                        onPress={() => {handleCentralButton()}}
                        color={"secondary"}
                        css={{
                            margin:"20px", 
                            borderRadius: "50%", 
                            width: '40px', 
                            height: '40px', 
                            minWidth: "0px",
                            }}><Image src="https://cdn-icons-png.flaticon.com/512/6367/6367663.png"/></Button>
                    <Card css={{ $$cardColor: '$colors$gray100' }}>
                        <Card.Body>
                        <Grid.Container justify="center" css={{padding: "10px 0 0 0"}}>
                            <Grid xs={8}>
                                <Input {...toInput.bindings} label="To" underlined placeholder='0.00' />
                            </Grid>
                            <Grid xs={4}>
                                <AssetSelect asset={assetToBuy} onPress={handleBuyAssetSelect}/>
                            </Grid>
                            <Container display='flex' justify='flex-start' css={{padding:0}}>
                                <Text size={14} color={"$secondary"}>Balance {balanceToBuy} {assetToBuy.symbol}</Text>                                
                            </Container>
                        </Grid.Container>
                        </Card.Body>
                    </Card>
                    <Spacer/>
                    {
                        !isConnected 
                        ? <Button disabled size="xl" color="primary" css={{width:"100%"}}>Connect your wallet</Button> 
                        : loading 
                            ? <Button disabled size="xl" color="primary" css={{width:"100%"}} onPress={() => handleSwap()}><Loading/></Button>
                            : <Button size="xl" color="primary" css={{width:"100%"}} onPress={() => handleSwap()}>Swap</Button>
                        }
                </Container>
                </Card>
                <Modal open={swapResultModalVisible} closeButton onClose={closeModalHandler}>
                    <Modal.Header>
                        <Text size="$xl" color="$primary">Swap completed</Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text>Swap completed successfully</Text>
                        <Divider/>
                        <Spacer y={0.1}/>
                        <Container display='flex' justify='flex-start' alignItems="center"  css={{padding: 0}}>
                            <IconButton onPress={() => copyToClipboard(swapTransactionId)}><ClipboardIcon/></IconButton>
                            <Text>Transaction ID: {abbreviateTransactionHash(swapTransactionId)}</Text>
                        </Container>
                    </Modal.Body>
                </Modal>
        </Container>
    )
}