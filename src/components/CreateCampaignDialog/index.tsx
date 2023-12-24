import { useState } from "react";
import { ArrowRight, ChevronLeft, StarIcon } from "lucide-react";

import _ from "lodash";
import clsx from "clsx";

import { Slideover } from "../../base-components/Headless";
import { FormLabel, FormInput, FormTextarea } from "../../base-components/Form";
import Button from "../../base-components/Button";

interface ICreateCampaignDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (_: any) => void;
}

const initialSteps = [
  {
    step: 1,
    name: "Create campaign",
    substeps: [
      {
        name: "Details",
        substep: 1,
        phases: [
          {
            phase: 1,
            name: "Select User",
          },
          {
            phase: 2,
            name: "Campaign name",
          },
        ],
      },
      {
        name: "Add Profile",
        substep: 2,
      },
      {
        name: "Provide search url",
        substep: 3,
      },
      {
        name: "Review",
        substep: 4,
      },
      {
        name: "Configure",
        substep: 5,
      },
      {
        name: "Sequence",
        substep: 6,
      },
    ],
  },
  {
    step: 2,
    name: "Start campaign",
  },
];

const initialUserCards = [
  {
    avatar: "AI",
    title: "Create campaign using SalesGPT",
    description: "Start with our powerful + proven template",
    brand: true,
  },
  {
    avatar: "",
    title: "I'm an advanced user",
    description: "",
    advanced: true,
  },
];

const initialImportCards = [
  {
    title: "Import from CSV",
    description: "Add Profiles from CSV file to campaign via bulk upload.",
  },
  {
    title: "Add Profiles from CSV file to campaign via bulk upload.",
    description:
      "Add Profiles from Sales Navigator search, use it to get your ideal linkedin profiles.",
  },
  {
    title: "Add from LinkedIn Search",
    description:
      "Add from a normal LinkedIn search, no Sales Navigator needed!",
  },
];

function Main({ open, onClose, onCreate }: ICreateCampaignDialogProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentSubStep, setCurrentSubStep] = useState<number>(1);
  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [campaignName, setCampaignName] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const onPrevSubStep = () => {
    if (currentSubStep === 3) {
      setCurrentSubStep(2);
    }
    // if (currentStep === 0) return;
    // setCurrentStep(currentStep - 1);
  };

  const onNextStep = () => {
    const substeps = initialSteps[currentStep - 1].substeps;
    if (substeps) {
      const phases = substeps[currentSubStep - 1].phases;
      if (
        phases &&
        currentPhase === phases.length &&
        currentSubStep < substeps.length
      ) {
        setCurrentSubStep(currentSubStep + 1);
        setCurrentPhase(1);
      } else if (
        phases &&
        currentPhase === phases.length &&
        currentSubStep === substeps.length
      ) {
        setCurrentStep(currentStep + 1);
        setCurrentSubStep(1);
        setCurrentPhase(1);
      } else if (phases && currentPhase < phases.length) {
        setCurrentPhase(currentPhase + 1);
      } else if (currentSubStep < substeps.length) {
        setCurrentSubStep(currentSubStep + 1);
        setCurrentPhase(1);
      } else {
        setCurrentStep(currentStep + 1);
        setCurrentSubStep(1);
        setCurrentPhase(1);
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const onCampaignCreate = () => {
    onCreate({ campaignName, searchUrl });
    setCurrentStep(1);
    setCurrentSubStep(1);
    setCurrentPhase(1);
    setCampaignName("");
    setSearchUrl("");
  };

  return (
    <Slideover open={open} onClose={onClose} size="screen">
      <Slideover.Panel>
        <Slideover.Title className="p-5">
          <h2 className="mr-auto text-base font-medium">Create Campaign</h2>
        </Slideover.Title>
        <Slideover.Description>
          <div className="py-10 flex gap-x-6">
            <div className="flex flex-col gap-y-5 relative shrink-0 basis-[250px]">
              {initialSteps.map((step: any, index: number) => (
                <div key={`step-${index}`} className="space-y-4">
                  <div className="flex gap-x-4 items-center">
                    <span
                      className={clsx(
                        "w-4 h-4 rounded-full flex items-center justify-center text-white",
                        currentStep === step.step
                          ? "bg-blue-700"
                          : "bg-gray-500"
                      )}
                    >
                      {step.step}
                    </span>
                    <p className="font-bold">{step.name}</p>
                  </div>
                  <div className="flex flex-col gap-y-4 rounded-full">
                    {step.substeps &&
                      step.substeps.map((child: any, index: number) => (
                        <div
                          key={`step-child-${index}`}
                          className="flex gap-x-4 items-center"
                        >
                          <div className="w-4 flex justify-center">
                            <span
                              className={clsx(
                                "w-2 h-2 rounded-full",
                                currentSubStep === child.substep
                                  ? "bg-blue-700"
                                  : "bg-gray-500"
                              )}
                            ></span>
                          </div>
                          <p
                            className={
                              currentStep === step.step &&
                              currentSubStep === child.substep
                                ? "text-blue-700 font-bold"
                                : "text-black"
                            }
                          >
                            {child.name}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              {/* <div className="absolute left-0 h-full w-4 bg-gray-200 rounded-full z-0" /> */}
            </div>
            <div className="grow flex flex-col gap-y-8">
              <div
                className={clsx("flex gap-x-1 items-center cursor-pointer", {
                  hidden: currentSubStep === 1,
                })}
                onClick={onPrevSubStep}
              >
                <span>
                  <ChevronLeft size={16} stroke="rgb(156 163 175)" />
                </span>
                <p className="text-gray-400">Back</p>
              </div>
              {currentStep === 1 &&
                currentSubStep === 1 &&
                currentPhase === 1 && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 h-fit">
                    {initialUserCards.map((user) => (
                      <div
                        key={`user-card-${user.title}`}
                        className="bg-white shadow-md rounded-xl relative p-6 flex flex-col gap-y-4 w-full hover:shadow-xl cursor-pointer"
                        onClick={onNextStep}
                      >
                        {user.brand && (
                          <div className="absolute right-0 top-0 py-0.5 px-4 bg-emerald-100 flex gap-x-2 items-center">
                            <span>
                              <StarIcon
                                size={16}
                                stroke="rgb(16, 185, 129)"
                                fill="transparent"
                              />
                            </span>
                            <p className="text-emerald-500 font-bold">
                              New Feature
                            </p>
                          </div>
                        )}
                        <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-violet-600 font-bold">
                          {user.avatar}
                        </span>
                        <div className="space-y-2">
                          <p className="font-bold">{user.title}</p>
                          <p className="text-gray-500 text-sm">
                            {user.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              {currentStep === 1 &&
                currentSubStep === 1 &&
                currentPhase === 2 && (
                  <div>
                    <div className="py-8 space-y-8">
                      <div>
                        <h1 className="font-bold text-xl">Create campaign</h1>
                        <p className="text-gray-400">
                          What would you like to call this campaign?
                        </p>
                      </div>
                      <div className="form flex flex-col gap-y-2">
                        <FormLabel htmlFor="regular-form-1">Name</FormLabel>
                        <FormInput
                          id="regular-form-1"
                          type="text"
                          placeholder="My first campaign"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                          className="max-w-[350px]"
                        />
                        <Button
                          variant="primary"
                          disabled={campaignName === ""}
                          className="w-20 mt-2 bg-blue-700 flex gap-x-1"
                          onClick={onNextStep}
                        >
                          Save
                          <span>
                            <ArrowRight size={16} />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              {currentStep === 1 && currentSubStep === 2 && (
                <div className="flex flex-col gap-y-10 w-full">
                  <h1 className="text-[20px] leading-[30px] font-bold">
                    Add linkedin profiles to your campaign
                  </h1>
                  <div className="flex flex-col gap-y-6">
                    <p>Basic imports</p>
                    <div className="grid grid-cols-3 gap-8">
                      {initialImportCards.map((card: any, index: number) => (
                        <div
                          key={index}
                          className="rounded-md hover:shadow-xl border-2 border-gray-200 p-6 flex flex-col justify-center cursor-pointer"
                          onClick={onNextStep}
                        >
                          <p className="font-bold text-black text-lg">
                            {card.title}
                          </p>
                          <p>{card.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 1 && currentSubStep === 3 && (
                <div className="flex flex-col gap-y-8">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h1 className="text-[20px] leading-[30px] font-bold text-black">
                        Import prospects from Sales Navigator
                      </h1>
                      <p>Import using linkedin search urls</p>
                    </div>
                    <Button
                      variant="primary"
                      onClick={onCampaignCreate}
                      className="flex gap-x-1"
                    >
                      Save
                      <span>
                        <ArrowRight size={16} />
                      </span>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-0.5">
                      <p className="text-[16px]">
                        Go to your linkedin account and create your search. Copy
                        the search url and paste here
                      </p>
                      <FormTextarea
                        className="w-full xl:w-2/3"
                        placeholder="Linkedin Search Link"
                        value={searchUrl}
                        onChange={(e: any) => setSearchUrl(e.target.value)}
                        rows={5}
                      />
                    </div>
                    <div className="flex gap-x-2">
                      <p>Example: </p>
                      <div className="space-y-1">
                        <a
                          className="text-blue-500 font-bold"
                          target="_blank"
                          href="https://www.linkedin.com/sales/search/people?query=(recentSearchParam%3A(id%3A2552307201%2CdoLogHistory%3Atrue)%2Cfilters%3AList((type%3ACOMPANY_HEADCOUNT%2Cvalues%3AList((id%3AC%2Ctext%3A11-50%2CselectionType%3AINCLUDED)))%2C(type%3AREGION%2Cvalues%3AList((id%3A101165590%2Ctext%3AUnited%2520Kingdom%2CselectionType%3AINCLUDED)))%2C(type%3AINDUSTRY%2Cvalues%3AList((id%3A48%2Ctext%3AConstruction%2CselectionType%3AINCLUDED)))%2C(type%3ARELATIONSHIP%2Cvalues%3AList((id%3AS%2Ctext%3A2nd%2520degree%2520connections%2CselectionType%3AINCLUDED)))%2C(type%3ACURRENT_TITLE%2Cvalues%3AList((id%3A1%2Ctext%3AOwner%2CselectionType%3AINCLUDED)%2C(id%3A195%2Ctext%3ACo-Owner%2CselectionType%3AINCLUDED)%2C(id%3A8%2Ctext%3AChief%2520Executive%2520Officer%2CselectionType%3AINCLUDED)%2C(id%3A16%2Ctext%3AManaging%2520Director%2CselectionType%3AINCLUDED)%2C(id%3A154%2Ctext%3AManaging%2520Partner%2CselectionType%3AINCLUDED)))%2C(type%3APOSTED_ON_LINKEDIN%2Cvalues%3AList((id%3ARPOL%2Ctext%3APosted%2520on%2520LinkedIn%2CselectionType%3AINCLUDED)))%2C(type%3ATITLE%2Cvalues%3AList((id%3A1%2Ctext%3AOwner%2CselectionType%3AINCLUDED)%2C(id%3A195%2Ctext%3ACo-Owner%2CselectionType%3AINCLUDED)%2C(id%3A8%2Ctext%3AChief%2520Executive%2520Officer%2CselectionType%3AINCLUDED)%2C(id%3A16%2Ctext%3AManaging%2520Director%2CselectionType%3AINCLUDED)%2C(id%3A154%2Ctext%3AManaging%2520Partner%2CselectionType%3AINCLUDED))%2CselectedSubFilter%3ACURRENT)))&sessionId=YLCuYoJ6QomuNUn5cWsH3w%3D%3D"
                        >
                          CEOs of 11-50 sized construction companies in the UK
                        </a>
                        <p>
                          please click on the link and modify the search filters
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  );
}

export default Main;
