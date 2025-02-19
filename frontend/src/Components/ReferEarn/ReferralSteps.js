import React from "react";
import ParentComponent from "./ParentComponent";

const ReferralSteps = () => {
  const steps = [
    {
      icon: "👤➕",
      text: "Submit referrals easily via our website’s referral section.",
    },
    {
      icon: "📋✍️",
      text: "Earn rewards once your referral joins an Accredian program.",
    },
    {
      icon: "💼💰",
      text: "Referrer receives a bonus 30 days after program enrollment.",
    },
  ];

  return (
    <div className="bg-blue-50 py-12 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        How Do I <span className="text-blue-600">Refer?</span>
      </h2>
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => (
          <div key={index} className="relative text-center">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-lg relative">
              <span className="text-4xl">{step.icon}</span>
            </div>
            <p className="mt-4 text-gray-700 text-sm w-40">{step.text}</p>
            {index < steps.length - 1 && (
              <div className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 text-blue-600 text-2xl">
                ➝
              </div>
            )}
          </div>
        ))}
      </div>
      <ParentComponent />
    </div>
  );
};

export default ReferralSteps;
