import { Button, Calendar, Flex, Input, InputNumber, Typography, message } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { FormState, setCity, setName, setBirthDate, setVehiclePower, setVoucher, setPriceMatch } from "./../../store/formSlice";
import Title from "antd/es/typography/Title";
import { Dayjs } from "dayjs";
import { InsuranceDataResponse, postInsuranceData } from './../../services/api'
import { useState } from "react";
import ResultComponent from "./ResultComponent";

function MainComponent() {
    const [resultData, setResultData] = useState<InsuranceDataResponse | null>(null)
    const [api, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const state = useSelector((state: { form: FormState }) => state.form);

    const handleSetName = (name: string) => {
        dispatch(setName(name));
    };

    const handleSetCity = (city: string) => {
        dispatch(setCity(city))
    }

    const handleSetBirthdate = (value: Dayjs) => {
        dispatch(setBirthDate(value.format('MM/DD/YYYY')))
    }

    const handleSetVehiclePower = (vehiclePower: number) => {
        dispatch(setVehiclePower(vehiclePower))
    }

    const handleSetVoucher = (voucher: number) => {
        dispatch(setVoucher(voucher))
    }

    const handleSetPriceMatch = (priceMatch: number) => {
        dispatch(setPriceMatch(priceMatch))
    }

    const disabledDate = (current: Dayjs) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const currentDate = new Date(current.year(), current.month(), current.date());
        return currentDate.getTime() > today.getTime();
      };

    const showNotification = () => {
        api.open({
            type: 'error',
            content: 'Form is not completed. All fields except Voucher and Price match are required!',
        });
    }

    const submitForm = async () => {
        if (state.name === '' || state.birthdate === '' || state.city === '' || state.vehiclePower === 0) showNotification()
        else {
            const response = await postInsuranceData(state)
            setResultData(response)
        }
    }
    return (
        <>
            {contextHolder}
            <Flex vertical gap={16}>
                <Title>User data</Title>
                <div className="flex justify-center flex-wrap">
                    <Typography.Title className="w-full text-center" level={4}>Full name</Typography.Title>
                    <Input
                        className="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-2/5"
                        placeholder="Enter your full name"
                        onChange={(e) => handleSetName(e.target.value)}
                    />
                </div>
                <div className="flex justify-center flex-wrap">
                    <Typography.Title className="w-full text-center" level={4}>Birthday</Typography.Title>
                    <Calendar className="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-2/5" disabledDate={disabledDate} fullscreen={false} onSelect={handleSetBirthdate} />
                </div>
                <div className="flex justify-center flex-wrap">
                    <Typography.Title className="w-full text-center" level={4}>City</Typography.Title>
                    <Input
                        className="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-2/5"
                        placeholder="Enter your city"
                        onChange={(e) => handleSetCity(e.target.value)}
                    />
                </div>
                <div className="flex justify-center flex-wrap">
                    <Typography.Title className="w-full text-center" level={4}>Vehicle power</Typography.Title>
                    <InputNumber className="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-2/5" placeholder="Enter the vehicle power" min={1} max={999} onChange={(e) => handleSetVehiclePower(e!)} />
                </div>
                <div className="flex justify-center flex-wrap">
                    <Typography.Title className="w-full text-center" level={4}>Voucher</Typography.Title>
                    <InputNumber className="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-2/5" placeholder="Enter the voucher" min={1} max={999} onChange={(e) => handleSetVoucher(e!)} />
                </div>
                <div className="flex justify-center flex-wrap">
                    <Typography.Title className="w-full text-center" level={4}>Price match</Typography.Title>
                    <InputNumber className="w-full sm:w-full md:w-4/5 lg:w-3/5 xl:w-2/5" placeholder="Enter the price match" min={1} max={999} onChange={(e) => handleSetPriceMatch(e!)} />
                </div>
                <div className="flex justify-center w-full">
                    <Button onClick={() => {
                        submitForm();
                    }}>Submit</Button>
                </div>
            </Flex>
            {
                resultData !== null && (
                    <ResultComponent {...resultData}/>
                )
            }
        </>
    )
}

export default MainComponent