import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";
import AddTraineeButton from "./AddTraineeButton";
import ReactModal from "react-modal";
import AddTraineeModal from "./AddTraineeModal";

type TraineeListElement = {
    id: number,
    name: string,
    birthday: string,
    member_seq: string,
    agency_id: number,
};

function Trainees() {
    const {token, getHeaders} = useUserContext();
    const [trainees, setTrainees] = useState<TraineeListElement[]>([]);

    const [showAddTraineeModal, setShowAddTraineeModal] = useState(false);

    useEffect(()=>{
        if (token === null) {
            return;
        }

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/trainees`, getHeaders())
        .then((res) => {
            console.log(res.data);
            // TODO: parse res.data and save it in 'trainees'
        })
    }, []);
    
    return (
        <>
            <ul>
                {trainees.map(trainee => (
                    <li key={trainee.id}>
                        <p>이름: {trainee.name}</p>
                        <p>생일: {trainee.birthday}</p>
                    </li>
                ))}
            </ul>
            <AddTraineeButton setShowModal={setShowAddTraineeModal} />
            {/* TODO: ReactModal 기본 설정들 다 합쳐서 Modal component 따로 만들기. */}
            <ReactModal
                appElement={document.getElementById('root') as HTMLElement}
                isOpen={showAddTraineeModal}
                onRequestClose={()=>setShowAddTraineeModal(false)}
                contentLabel="example"
            >
                <AddTraineeModal />
            </ReactModal>
        </>
    );
}

export default Trainees;
