import Modal from "@/shared/components/modal";
import {AUTH_PAGE_MODE} from "@/features/auth/constants/auth.constants";
import RegistrationPageContent from "@/features/auth/components/RegistrationPageContent";

const ModalRegistrationPage = () => {
    return (
        <Modal>
            <RegistrationPageContent mode={AUTH_PAGE_MODE.MODAL} />
        </Modal>

    );
};
export default ModalRegistrationPage;