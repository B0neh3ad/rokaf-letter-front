import { Dispatch, SetStateAction } from "react";

function AddTraineeButton({setShowModal}: {setShowModal: Dispatch<SetStateAction<boolean>>}) {
    const handleShowModal = () => setShowModal(true);

    return (
        <>
            <div onClick={handleShowModal}>
                훈련병 추가
            </div>
        </>
    );
}

export default AddTraineeButton;
