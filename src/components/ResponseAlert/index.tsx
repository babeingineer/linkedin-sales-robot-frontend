import { Dialog } from "../../base-components/Headless";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";

interface IResponseAlertProps {
    buttonModalPreview: boolean,
    setButtonModalPreview: (buttonModalPreview: boolean) => void,
    isSuccess: boolean
}

function Main({ buttonModalPreview, setButtonModalPreview, isSuccess }: IResponseAlertProps) {
    return (
        <Dialog open={buttonModalPreview} onClose={() => {
            setButtonModalPreview(false);
        }}
        >
            <Dialog.Panel>
                <a onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    setButtonModalPreview(false);
                }}
                    className="absolute top-0 right-0 mt-3 mr-3"
                    href="#"
                >
                    <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                </a>
                {
                    isSuccess ?
                        <div className="p-5 text-center">
                            <Lucide icon="CheckCircle" className="w-16 h-16 mx-auto mt-3 text-success" />
                            <div className="mt-5 text-3xl">SAVE SUCCESS</div>
                        </div> :
                        <div className="p-5 text-center">
                            <Lucide icon="XCircle" className="w-16 h-16 mx-auto mt-3 text-danger" />
                            <div className="mt-5 text-3xl text-danger">SAVE FAILED</div>
                        </div>

                }
                <div className="px-5 pb-8 text-center">
                    <Button type="button" variant="primary" onClick={() => {
                        setButtonModalPreview(false);
                    }}
                        className="w-24"
                    >
                        Ok
                    </Button>
                </div>
            </Dialog.Panel>
        </Dialog>
    )
}

export default Main;