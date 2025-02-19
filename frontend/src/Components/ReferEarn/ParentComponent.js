import { useState } from "react";
import ReferralModal from "./ReferralModal";

const ParentComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)} className="flex justify-center items-center mx-auto px-8 py-2 bg-blue-500 text-white rounded-lg mt-28">Refer a Friend 
            </button>
                <div className="flex justify-center items-center mx-auto">click & send</div>
            {isModalOpen && <ReferralModal onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default ParentComponent;
