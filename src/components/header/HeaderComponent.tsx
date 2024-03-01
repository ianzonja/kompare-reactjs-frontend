import { Button, Card, Col, Row, Switch } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormState, setDiscounts } from "../../store/formSlice";
import { Discounts } from "../../enums/discounts";

function HeaderComponent() {
    const [commercialDiscountSwitch, setCommercialDiscountSwitch] = useState(false);
    const [adviserDiscountSwitch, setAdviserDiscountSwitch] = useState(false);
    const [vipDiscountSwitch, setVipDiscountSwitch] = useState(false);
    
    const dispatch = useDispatch();
    const vehiclePower = useSelector((state: { form: FormState }) => state.form.vehiclePower);
    const additionalCoverages = useSelector((state: { form: FormState}) => state.form.coverages);
    const discounts = useSelector((state: { form: FormState}) => state.form.discounts);

    useEffect(() =>{
        if (vehiclePower > 100 && discounts.indexOf(Discounts.STRONG_CAR_SURCHARGE) === -1) {
            const newDiscounts = [...discounts]
            newDiscounts.push(Discounts.STRONG_CAR_SURCHARGE)
            dispatch(setDiscounts(newDiscounts))
        }
        else if (vehiclePower <= 100 && discounts.indexOf(Discounts.STRONG_CAR_SURCHARGE) !== -1) {
            let newDiscounts = [...discounts]
            newDiscounts = newDiscounts.filter(element => element != Discounts.STRONG_CAR_SURCHARGE)
            dispatch(setDiscounts(newDiscounts))
        }
    }, [vehiclePower, discounts, dispatch])

    const handleCommercialDiscountSwitch = (checked: boolean) => {
        if (checked === true) {
            const newDiscounts = [...discounts]
            newDiscounts.push(Discounts.COMMERCIAL)
            dispatch(setDiscounts(newDiscounts));
        } else {
            let newDiscounts = [...discounts]
            newDiscounts = newDiscounts.filter(element => element != Discounts.COMMERCIAL)
            dispatch(setDiscounts(newDiscounts));
        }
        setCommercialDiscountSwitch(checked);
    };
    const handleAdviserDiscountSwitch = (checked: boolean) => {
        if (checked === true) {
            const newDiscounts = [...discounts]
            newDiscounts.push(Discounts.ADVISER)
            dispatch(setDiscounts(newDiscounts));
        } else {
            let newDiscounts = [...discounts]
            newDiscounts = newDiscounts.filter(element => element != Discounts.ADVISER)
            dispatch(setDiscounts(newDiscounts));
        }
        setAdviserDiscountSwitch(checked);
    };
    const handleVipDiscountSwitch = (checked: boolean) => {
        if (checked === true) {
            const newDiscounts = [...discounts]
            newDiscounts.push(Discounts.VIP)
            dispatch(setDiscounts(newDiscounts));
        } else {
            let newDiscounts = [...discounts]
            newDiscounts = newDiscounts.filter(element => element != Discounts.VIP)
            dispatch(setDiscounts(newDiscounts));
        }
        setVipDiscountSwitch(checked);
    };
    return (
        <div className="flex flex-wrap">
            <div className="p-2 flex-grow flex-1 w-full">
                <Card title="Commercial discount" className="w-full h-full" extra={<Switch className="bg-zinc-300" checked={commercialDiscountSwitch} onChange={handleCommercialDiscountSwitch}/>}>
                    <Row className="text-wrap" justify="center">
                        <div>10% on the base price</div>
                    </Row>
                </Card>
            </div>
            {
                additionalCoverages.length > 1 && (
                    <div className="p-2 flex-grow flex-1 w-full">
                        <Card
                            title="Adviser discount"
                            className="w-full h-full"
                            extra={
                                <Switch
                                className="bg-zinc-300"
                                checked={adviserDiscountSwitch}
                                onChange={handleAdviserDiscountSwitch}
                                />
                            }
                        >
                            <Row className="text-wrap" justify="center">
                                <div>20% on all coverages - if at least 2 coverages are selected</div>
                            </Row>
                        </Card>
                    </div>
                )
            }
            {
                vehiclePower > 80 && (
                    <div className="flex-grow flex-1 p-2 w-full">
                        <Card title="VIP discount" className="w-full h-full" extra={<Switch className="bg-zinc-300" checked={vipDiscountSwitch} onChange={handleVipDiscountSwitch} />}>
                            <Row className="text-wrap" justify="center">
                                <div>5% on the total price if vehicle power over 80</div>
                            </Row>
                        </Card>
                    </div>
                )
            }

            {
                vehiclePower > 100 && (
                    <div className="flex-grow flex-1 p-2 w-full">
                        <Card title="Strong car surcharge" className="w-full h-full">
                            <Row className="w-full h-full" justify="center">
                                <div className="text-wrap">+ 10% if vehicle power over 100 - applied automatically (can’t be turned off)</div>
                            </Row>
                        </Card>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderComponent;