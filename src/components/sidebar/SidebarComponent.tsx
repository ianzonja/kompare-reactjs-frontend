import { Card, Row, Switch } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormState, setCoverages } from "../../store/formSlice";
import { Coverages } from "../../enums/coverages";

interface SidebarProps {
    sidebarCollapsed: boolean;
}

function SidebarComponent (collapsed: SidebarProps) {
    const [bonusProtectionSwitch, setBonusProtectionSwitch] = useState(false);
    const [aoSwitch, setAoSwitch] = useState(false);
    const [glassProtectionSwitch, setGlassProtectionSwitch] = useState(false);

    const dispatch = useDispatch();
    const coverages = useSelector((state: { form: FormState }) => state.form.coverages);

    const handleBonusProtectionSwitch = (checked: boolean) => {
        setBonusProtectionSwitch(checked);
        if (checked === true) {
            const newCoverages = [...coverages]
            newCoverages.push(Coverages.BONUS_PROTECTION)
            dispatch(setCoverages(newCoverages));
        } else {
            let newCoverages = [...coverages]
            newCoverages = newCoverages.filter(element => element !== Coverages.BONUS_PROTECTION)
            dispatch(setCoverages(newCoverages));
        }
    };
    const handleAoSwitch = (checked: boolean) => {
        setAoSwitch(checked);
        if (checked === true) {
            const newCoverages = [...coverages]
            newCoverages.push(Coverages.AO)
            dispatch(setCoverages(newCoverages));
        } else {
            let newCoverages = [...coverages]
            newCoverages = newCoverages.filter(element => element !== Coverages.AO)
            dispatch(setCoverages(newCoverages));
        }
    };
    const handleGlassProtectionSwitch = (checked: boolean) => {
        setGlassProtectionSwitch(checked);
        if (checked === true) {
            const newCoverages = [...coverages]
            newCoverages.push(Coverages.GLASS_PROTECTION)
            dispatch(setCoverages(newCoverages));
        } else {
            let newCoverages = [...coverages]
            newCoverages = newCoverages.filter(element => element !== Coverages.GLASS_PROTECTION)
            dispatch(setCoverages(newCoverages));
        }
    };
    return (
        <div className="w-full flex flex-column flex-wrap h-full items-center justify-center">
            {
                collapsed.sidebarCollapsed === false && (
                    <div className="flex flex-column flex-wrap items-center justify-center">
                        <div className="flex-grow flex-1 p-2 h-60">
                            <Card title={Coverages.BONUS_PROTECTION} className="w-full h-full" extra={<Switch className="bg-zinc-300" checked={bonusProtectionSwitch} onChange={handleBonusProtectionSwitch} />}>
                                <Row className="w-full h-full" justify="center">
                                    <div> 12% of the base price </div>
                                </Row>
                            </Card>
                        </div>
                        <div className="flex-grow flex-1 p-2 h-60">
                            <Card title="AO+" className="w-full h-full" extra={<Switch className="bg-zinc-300" checked={aoSwitch} onChange={handleAoSwitch} />}>
                                <Row className="w-full h-full" justify="center">
                                    <div>
                                        <ol>
                                            <li>
                                                55 EUR for users younger than 30 years
                                            </li>
                                            <li>
                                                105 EUR for users that are 30 years old or older
                                            </li>
                                        </ol>
                                    </div>
                                </Row>
                            </Card>
                        </div>
                        <div className="flex-grow flex-1 p-2 h-60">
                            <Card title="Glass protection" className="w-full h-full" extra={<Switch className="bg-zinc-300" checked={glassProtectionSwitch} onChange={handleGlassProtectionSwitch} />}>
                                <Row className="w-full h-full" justify="center">
                                    <div>80% of the vehicle power</div>
                                </Row>
                            </Card>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SidebarComponent;