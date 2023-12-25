import axios from "axios";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
<<<<<<< HEAD
=======
import io, { Socket } from "socket.io-client";
>>>>>>> bf018c2 (ugly)

import _ from "lodash";
import clsx from "clsx";

import { Slideover } from "../../base-components/Headless";
import { FormLabel, FormInput, FormSelect } from "../../base-components/Form";
import Button from "../../base-components/Button";

import { useAppDispatch } from "../../stores/hooks";
import { setLinkedinLoader } from "../../stores/linkedinLoaderSlice";

import { AuthContext } from "../../providers/AuthProvider";

<<<<<<< HEAD
import { SERVER_URL } from "../../config";
=======
import { SERVER_URL, SOCKETIO_URL } from "../../config";
>>>>>>> bf018c2 (ugly)

interface ILinkedInLoginDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialSteps = [
  {
    step: 1,
    name: "Add Linkedin Account",
  },
];

function Main({ open, onClose }: ILinkedInLoginDialogProps) {
  const dispatch = useAppDispatch();
  const { account, setAccount } = useContext(AuthContext);

<<<<<<< HEAD
  const [socketAvailable, setSocketAvailiable] = useState(false);
=======
  // const [socketAvailable, setSocketAvailiable] = useState(false);
>>>>>>> bf018c2 (ugly)
  const [screenImageSrc, setScreenImageSrc] = useState("");
  const [lastSentDate, setLastSentDate] = useState<Date>(new Date());
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSubStep, setCurrentSubStep] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);

<<<<<<< HEAD
  const screenSocket = useRef<WebSocket>();
  const mouseSocket = useRef<WebSocket>();
  const keybdSocket = useRef<WebSocket>();
  const imageRef = useRef<HTMLImageElement>(null);

  const onAddAccountClick = async () => {
    setSocketAvailiable(true);
    const response = await axios("/linkedinlogin").then((res) => res.data);
    if (response === "success") {
      dispatch(setLinkedinLoader(true));
      setAccount({ ...account, hasLinkedin: true });
      setCurrentPhase(0);
      setSocketAvailiable(false);
      onClose();
    } else {
      setSocketAvailiable(false);
    }
  };

  const onScreenSocketOpen = () => {
    setCurrentPhase(currentPhase + 1);
  };

  const onScreenReceive = (e: MessageEvent) => {
    setScreenImageSrc(`data:image/png;base64,${e.data}`);
=======
  // const screenSocket = useRef<Socket>();
  // const mouseSocket = useRef<Socket>();
  // const keybdSocket = useRef<Socket>();
  const socket = useRef<Socket>();
  const imageRef = useRef<HTMLImageElement>(null);

  const onAddAccountClick = () => {
    createSocket();
    axios("/linkedinlogin")
      .then((res) => res.data)
      .then((response) => {
        if (response === "success") {
          dispatch(setLinkedinLoader(true));
          setAccount({ ...account, hasLinkedin: true });
          setCurrentPhase(0);
          onClose();
        }
        destroySocket();
      });
  };

  const onSocketOpen = () => {
    console.log("--------------Socket Opened---------------");
    setCurrentPhase(currentPhase + 1);
  };

  const onSocketClose = () => {
    console.log("---------------Socket Closed---------------");
    destroySocket();
    setCurrentPhase(0);
  };

  const onScreenReceive = (data: any) => {
    if (!imageRef.current) return;
    console.log("-------------------Socket Data--------------", data);
    setScreenImageSrc(`data:image/png;base64,${data}`);
>>>>>>> bf018c2 (ugly)
  };

  const onContextMenu = (e: globalThis.MouseEvent) => {
    e.preventDefault();
  };

  const onMouseDown = (e: MouseEvent) => {
<<<<<<< HEAD
    if (!mouseSocket.current || !imageRef.current) return;
=======
    if (!socket.current || !imageRef.current) return;
>>>>>>> bf018c2 (ugly)
    const screenWidth = imageRef.current.clientWidth;
    const screenHeight = imageRef.current.clientHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaledX = (x / screenWidth).toFixed(4);
    const scaledY = (y / screenHeight).toFixed(4);
<<<<<<< HEAD
    mouseSocket.current.send(`MOUSEDOWN ${scaledX} ${scaledY} ${e.button}`);
  };
  const onMouseUp = (e: MouseEvent) => {
    if (!mouseSocket.current || !imageRef.current) return;
=======
    socket.current.emit("mouse", "MOUSEDOWN", scaledX, scaledY, e.button);
  };
  const onMouseUp = (e: MouseEvent) => {
    if (!socket.current || !imageRef.current) return;
>>>>>>> bf018c2 (ugly)
    const screenWidth = imageRef.current.clientWidth;
    const screenHeight = imageRef.current.clientHeight;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaledX = (x / screenWidth).toFixed(4);
    const scaledY = (y / screenHeight).toFixed(4);
<<<<<<< HEAD
    mouseSocket.current.send(`MOUSEUP ${scaledX} ${scaledY} ${e.button}`);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!mouseSocket.current || !imageRef.current) return;
    if (mouseSocket.current.readyState !== WebSocket.OPEN) return;
=======
    socket.current.emit("mouse", `MOUSEUP`, scaledX, scaledY, e.button);
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!socket.current || !imageRef.current) return;
>>>>>>> bf018c2 (ugly)

    if (new Date().getTime() - lastSentDate.getTime() > 100) {
      setLastSentDate(new Date());
      const screenWidth = imageRef.current.clientWidth;
      const screenHeight = imageRef.current.clientHeight;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const scaledX = (x / screenWidth).toFixed(4);
      const scaledY = (y / screenHeight).toFixed(4);
<<<<<<< HEAD
      mouseSocket.current.send(`MOVE ${scaledX} ${scaledY}`);
    }
  };
  const onWheel = (e: WheelEvent) => {
    if (!mouseSocket.current) return;
    if (mouseSocket.current.readyState !== WebSocket.OPEN) return;

    const scrollValue = -e.deltaY; // This captures the scroll delta
    mouseSocket.current.send(`SCROLL ${scrollValue}`);
  };

  const onKeyDown = (e: globalThis.KeyboardEvent) => {
    if (!keybdSocket.current) return;
    if (keybdSocket.current.readyState !== WebSocket.OPEN) return;

    e.preventDefault();
    keybdSocket.current?.send(`KEYDOWN ${e.key}`);
  };
  const onKeyUp = (e: globalThis.KeyboardEvent) => {
    if (!keybdSocket.current) return;
    if (keybdSocket.current.readyState !== WebSocket.OPEN) return;
    e.preventDefault();
    keybdSocket.current?.send(`KEYUP ${e.key}`);
  };

  const createSocket = () => {
    screenSocket.current = new WebSocket("ws://192.168.128.14:8765");
    mouseSocket.current = new WebSocket("ws://192.168.128.14:8766");
    keybdSocket.current = new WebSocket("ws://192.168.128.14:8767");

    screenSocket.current.addEventListener("message", onScreenReceive);
    screenSocket.current.addEventListener("open", onScreenSocketOpen);
=======
      socket.current.emit("mouse", "MOVE", scaledX, scaledY);
    }
  };
  const onWheel = (e: WheelEvent) => {
    if (!socket.current) return;

    const scrollValue = -e.deltaY; // This captures the scroll delta
    socket.current.emit("mouse", "SCROLL", scrollValue);
  };

  const onKeyDown = (e: globalThis.KeyboardEvent) => {
    if (!socket.current) return;

    e.preventDefault();
    socket.current.emit("kbd", "KEYDOWN", e.key);
  };
  const onKeyUp = (e: globalThis.KeyboardEvent) => {
    if (!socket.current) return;

    e.preventDefault();
    socket.current.emit("kbd", "KEYUP", e.key);
  };

  const createSocket = () => {
    console.log("---------------------Create Socket----------------");
    socket.current = io(SOCKETIO_URL);
    socket.current.on("connect", onSocketOpen);
    socket.current.on("disconnect", onSocketClose);
    socket.current.on("screen", onScreenReceive);
>>>>>>> bf018c2 (ugly)

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("wheel", onWheel);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
  };

  const destroySocket = () => {
<<<<<<< HEAD
    screenSocket.current?.close();
    mouseSocket.current?.close();
    keybdSocket.current?.close();

=======
    console.log("----------------Destroy Socket--------------");
>>>>>>> bf018c2 (ugly)
    document.removeEventListener("contextmenu", onContextMenu);
    document.removeEventListener("wheel", onWheel);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("keyup", onKeyUp);

<<<<<<< HEAD
    screenSocket.current?.removeEventListener("message", onScreenReceive);

    delete screenSocket.current;
    delete mouseSocket.current;
    delete keybdSocket.current;
  };

  useEffect(() => {
    if (!open || !socketAvailable) return;

    if (socketAvailable) {
      createSocket();
    } else {
      destroySocket();
    }

    return () => {
      destroySocket();
    };
  }, [open, socketAvailable]);
=======
    if (socket.current) {
      socket.current.off("open", onSocketOpen);
      socket.current.off("close", onSocketClose);
      socket.current.off("screen", onScreenReceive);
      delete socket.current;
    }
  };

  useEffect(() => {
    if (!open) {
      destroySocket();
    }
  }, [open]);
>>>>>>> bf018c2 (ugly)

  return (
    <Slideover open={open} onClose={onClose} size="screen">
      <Slideover.Panel>
        <Slideover.Title className="p-5">
          <span className="text-[24px] mr-4 cursor-pointer" onClick={onClose}>
            &times;
          </span>
          <h2 className="mr-auto text-base font-medium">
            Add Linkedin Account
          </h2>
        </Slideover.Title>
        <Slideover.Description>
          <div className="flex gap-x-6">
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
                  {step.children && (
                    <div className="flex flex-col gap-y-4 rounded-full">
                      {step.children.map((child: any, index: number) => (
                        <div
                          key={`step-child-${index}`}
                          className="flex gap-x-4 items-center"
                        >
                          <div className="w-4 flex justify-center">
                            <span
                              className={clsx(
                                "w-2 h-2 rounded-full",
                                currentSubStep === index + 1
                                  ? "bg-blue-700"
                                  : "bg-gray-500"
                              )}
                            ></span>
                          </div>
                          <p>{child.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="grow">
              {currentPhase === 0 ? (
                <div className="flex flex-col gap-y-12">
                  <p
                    className={clsx(
                      "flex gap-x-0.5 items-center cursor-pointer",
                      { hidden: currentPhase === 0 }
                    )}
                  >
                    <span>
                      <ChevronLeft />
                    </span>
                    Back
                  </p>
                  <div className="flex flex-wrap max-w-[700px] gap-6">
                    <div className="space-y-4">
                      <FormLabel>LinkedIn Email ID</FormLabel>
                      <FormInput />
                    </div>
                    <div className="space-y-4">
                      <FormLabel>LinkedIn Password</FormLabel>
                      <FormInput />
                    </div>
                    <div className="space-y-4">
                      <FormLabel>Select Proxy Location</FormLabel>
                      <FormSelect />
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    className="flex gap-x-2 self-start px-4"
                    onClick={onAddAccountClick}
                  >
                    Add Account
                    <span>
                      <ArrowRight size={14} />
                    </span>
                  </Button>
                </div>
              ) : (
                <img
                  alt="Real-time image from remote machine"
                  src={screenImageSrc}
                  draggable={false}
                  ref={imageRef}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  onMouseMove={onMouseMove}
                />
              )}
            </div>
          </div>
        </Slideover.Description>
      </Slideover.Panel>
    </Slideover>
  );
}

export default Main;
