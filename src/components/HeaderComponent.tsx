import { Button, Card, Row, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import './../components/HeaderComponent.css'

function HeaderComponent() {
    const [switchValue, setSwitchValue] = useState(false);

    const handleSwitchChange = (checked: boolean) => {
      setSwitchValue(checked);
    };
    return (
        <div>
            <Card title="Example Card" extra={<Switch checked={switchValue} onChange={handleSwitchChange} />} style={{ width: 300 }}>
                <Row className="bg-blue-500 w-full h-full" justify="center">
                    <div>sdadasda</div>
                </Row>
            </Card>
            <Button type="primary">Hello, Ant Design!</Button>
        </div>
    )
}

export default HeaderComponent;