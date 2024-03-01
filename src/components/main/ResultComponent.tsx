import { Col, Divider, Row, Statistic, Table, TableProps, Typography } from "antd"
import { InsuranceDataResponse } from "../../services/api"

interface Columns {
    name: string;
    description: string;
    price: number;
}

function resultComponent(data: InsuranceDataResponse) {
    const coveragesColumns: TableProps<Columns>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'coverageName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'coverageDescription',
        },
        {
            title: 'Price in EUR',
            dataIndex: 'price',
            key: 'coveragePrice',
        }
    ]
    const discountColumns: TableProps<Columns>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'discountName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'discountDescription',
        },
        {
            title: 'Price in EUR',
            dataIndex: 'price',
            key: 'discountPrice',
        }
    ]
    const coverages = data.additionalCoverages
    const coverageTableValues: Columns[] = []
    for (const coverage of coverages) {
        coverageTableValues.push({
            name: coverage.coverage.name,
            description: coverage.coverage.description,
            price: coverage.price
        })
    }

    const discounts = data.discounts
    const discountTableValues: Columns[] = []
    for (const discount of discounts) {
        discountTableValues.push({
            name: discount.discount.name,
            description: discount.discount.description,
            price: discount.price
        })
    }
    if (data.voucher > 0) {
        discountTableValues.push({
            name: 'Voucher',
            description: 'User entered voucher',
            price: data.voucher
        })
    }
    return (
        <>
            <Divider />
            <Typography.Title>Result</Typography.Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Base price in EUR" value={data.basePrice} precision={2} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total price in EUR" value={data.totalPrice} precision={2} />
                </Col>
            </Row>
            <Divider />
            <Typography.Title level={4}>Additional coverages</Typography.Title>
            <Table columns={coveragesColumns} dataSource={coverageTableValues} />
            <Divider />
            <Typography.Title level={4}>Discounts</Typography.Title>
            <Table columns={discountColumns} dataSource={discountTableValues} />
        </>

    )
}
export default resultComponent