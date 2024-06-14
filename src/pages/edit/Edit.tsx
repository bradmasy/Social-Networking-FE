
import { BookingEditForm, NavBar, UserEditForm, PasswordEditForm } from "../../components";

export interface PasswordChange {
    oldPassword: string;
    newPassword: string;
    retypePassword: string;
}

export const Edit: React.FC = () => {

    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get("type");

    return (
        <>
            <NavBar />

            <section className="ss-edit-container">

                {type === "password" && (
                    <>
                        <PasswordEditForm />
                    </>
                )}
                {type === "user-details" && (
                    <>
                        <UserEditForm />
                    </>
                )}
                {
                    type === "booking" && (
                        <>
                            <BookingEditForm />
                        </>
                    )
                }
            </section>
        </>
    )
}