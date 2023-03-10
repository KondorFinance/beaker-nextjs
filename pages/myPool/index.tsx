import { Table, Text, Container, Row, Col, Tooltip } from '@nextui-org/react'
import React from 'react'
import { IconButton } from '../../src/components/IconButton/IconButton'
import { PlusCircleIcon } from '../../public/icons/PlusCircleIcon'
import { DeleteIcon } from '../../public/icons/DeleteIcon'
import { ChartIcon } from '../../public/icons/ChartIcon'
import Link from 'next/link'
import { getMyPools, MyPoolType } from '../../src/services/poolService'

export default function MyPool () {
  const myPools: MyPoolType[] = getMyPools()

  const columns = [
    { name: 'MYPOOL', uid: 'pool' },
    { name: 'VOLUME 24H', uid: 'volume' },
    { name: 'MY STAKE', uid: 'myStake' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  const renderCell = (myPool: MyPoolType, columnKey: React.Key) => {
    const cellValue = myPool[columnKey as keyof MyPoolType]
    switch (columnKey) {
      case 'pool':
      case 'volume':
      case 'myStake':
        return (
          <Text b size={14} css={{ tt: 'capitalize' }}>
            {cellValue}
          </Text>
        )

      case 'actions':
        return (
          <Row justify='center' align='center'>
            <Col css={{ d: 'flex' }}>
              <Link href={'/myPool/details/' + myPool.id} legacyBehavior>
                <a onClick={() => {}}>
                  <Tooltip content='Details'>
                    <IconButton>
                      <ChartIcon size={20} fill='#979797' />
                    </IconButton>
                  </Tooltip>
                </a>
              </Link>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Link href={'/pool/addLiquidity/' + myPool.id} legacyBehavior>
                <a onClick={() => {}}>
                  <Tooltip content='Add liquidity'>
                    <IconButton>
                      <PlusCircleIcon size={20} fill='#979797' />
                    </IconButton>
                  </Tooltip>
                </a>
              </Link>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Link href={'/pool/removeLiquidity/' + myPool.id} legacyBehavior>
                <a onClick={() => {}}>
                  <Tooltip content='Remove liquidity'>
                    <IconButton>
                      <DeleteIcon size={20} fill='#FF0080' />
                    </IconButton>
                  </Tooltip>
                </a>
              </Link>
            </Col>
          </Row>
        )
      default:
        return cellValue
    }
  }

  return (
    <Container css={{ p: '8px', mw: '992px' }}>
      <Container css={{ m: 0, p: 0 }}>
        <Container css={{ m: 0, p: 0, d: 'flex', flexDirection: 'column' }}>
          <Text h1 css={{ color: '$kondorGray' }}>MyPools</Text>
          <Text h4 css={{ color: '$kondorGray' }}>Manage your pools</Text>
        </Container>
      </Container>
      <Table
        aria-label='Example table with custom cells'
        css={{
          height: 'auto',
          minWidth: '100%',
          bg: 'rgb(0, 0, 0, 0.6)',
          backdropFilter: 'saturate(180%) blur(10px);',
          m: '16px 0',
          borderRadius: '16px'
        }}
        selectionMode='none'
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === 'actions'}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={myPools}>
          {(item: MyPoolType) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}
