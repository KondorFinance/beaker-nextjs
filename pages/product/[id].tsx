import { Text, Container, Tooltip, Card, Spacer, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { getProductById } from '../../src/services/mock'
import { IconButton } from '../../src/components/IconButton/IconButton'
import { InfoIcon } from '../../public/icons/InfoIcon'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Product } from '../../interfaces'
import Nft from '../../src/components/Nft/Nft'
import { LinkButton } from '../../src/components/LinkButton/LinkButton'
import { CiBadgeDollar, CiLock } from 'react-icons/ci'
import ItemDetailCard from '../../src/components/ItemDetailCard/ItemDetailCard'
import { abbreviateNumber } from '../../src/utils/utils'

export default function Details () {
  const router = useRouter()
  const [product, setProduct] = useState<Product>()
  const { id } = router.query

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(Number(id))
      setProduct(product)
    }
    fetchProduct()
  }, [id])

  if (!product) return <Container><Text>Product not found</Text></Container>

  return (
    <Container display='flex' justify='center' alignContent='flex-start' css={{ minHeight: '85vh', p: '16px' }}>
      <Card css={{
        p: '8px',
        maxWidth: '400px',
        minHeight: '200px',
        bg: 'rgb(0, 0, 0, 0.6)',
        backdropFilter: 'saturate(180%) blur(10px);'
      }}
      >
        <Container display='flex' justify='space-between' css={{ p: 0 }}>
          <Text size={20} css={{ color: '$kondorLight' }}>{product.name} Product</Text>
          <Tooltip content='Details'>
            <IconButton>
              <InfoIcon size={20} fill='#979797' />
            </IconButton>
          </Tooltip>
        </Container>
        <Spacer y={1} />
        <Grid.Container>
          <Grid xs={12} md={6}>
            <ItemDetailCard
              title='Total value locked'
              value={`≈$ ${abbreviateNumber(product.value)}`}
              icon={<CiLock size={40} />}
              m={8}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <ItemDetailCard
              title='Total rewards'
              value={`≈$ ${abbreviateNumber(product.value * 0.001)}`}
              icon={<CiBadgeDollar size={40} />}
              m={8}
            />
          </Grid>
        </Grid.Container>
        <Card css={{ p: '16px', m: '8px', w: 'auto' }}>
          {
            product.assets.map((a, index) => {
              return (
                <Container key={index} css={{ p: 0, m: 0 }} display='flex' justify='space-between'>
                  <Text size={16} css={{ color: '$kondorGray' }}>{a.symbol} Pool</Text>
                  <Text>{a.amount}</Text>
                </Container>
              )
            })
          }
        </Card>
        <Container css={{ p: '8px' }} display='flex' justify='center'>
          <Nft id={product.id} name={product.name} />
        </Container>
        <Link href={'/product/delete/' + product?.id}>
          <LinkButton>
            Remove NFT liquidity
          </LinkButton>
        </Link>
      </Card>
    </Container>
  )
}
