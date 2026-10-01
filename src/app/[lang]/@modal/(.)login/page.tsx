import Modal from "@/shared/components/modal";
import {AUTH_PAGE_MODE} from "@/features/auth/constants/auth.constants";
import LoginPageContent from "@/features/auth/components/LoginPageContent";

const ModalLoginPage = () => {
    return (
        <Modal>
            <LoginPageContent mode={AUTH_PAGE_MODE.MODAL} />
        </Modal>

    );
};
export default ModalLoginPage;