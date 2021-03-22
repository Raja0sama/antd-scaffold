import React, { useState } from 'react';
import styles from './index.less';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Auth from "../../../../services/auth"



export default function ResetPassword() {

    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        const status = await Auth.resetPassoword(email);
        console.log(status)

        if (status) {
            message.success('Reset Passowrd link sent to email');
            setTimeout(() => {
                window.location.href = "/user/login";
            }, 2000);
            setEmail("");
        } else {
            message.error('Email Provided is incorrect');
            setEmail("");
        }
    }


    return (
        <div className={styles.main}>


            <Input value={email} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <Button
                block
                type="primary"
                htmlType="submit"
                style={{ marginTop: "24px" }}
                onClick={handleSubmit}
            >
                Submit
                    </Button>

        </div>
    );
};

