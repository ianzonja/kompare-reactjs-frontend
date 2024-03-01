import { type } from "@testing-library/user-event/dist/type"
import { Button, Col, Divider, Row, Statistic, Table, TableProps, Typography } from "antd"
import style from "antd/es/affix/style"
import { title } from "process"
import { InsuranceDataResponse } from "../../services/api"

interface Columns {
    name: string;
    description: string;
    price: number;
}

function resultComponent(data: InsuranceDataResponse) {
    const tableColumns: TableProps<Columns>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price in EUR',
            dataIndex: 'price',
            key: 'price',
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
    return (
        <>
            <Divider />
            <Typography.Title>Result</Typography.Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Base price" value={data.basePrice} precision={2} />
                </Col>
                <Col span={12}>
                    <Statistic title="Total price" value={data.totalPrice} precision={2} />
                </Col>
            </Row>
            <Divider />
            <Typography.Title level={4}>Additional coverages</Typography.Title>
            <Table columns={tableColumns} dataSource={coverageTableValues} />
            <Divider />
            <Typography.Title level={4}>Discounts</Typography.Title>
            <Table columns={tableColumns} dataSource={discountTableValues} />
        </>

    )
}
export default resultComponent