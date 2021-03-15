import React from 'react'
import Popper from 'popper.js';
import {BsInfo} from 'react-icons/bs'

export default function Tooltip({inputType}) {
    const [tooltipShow, setTooltipShow] = React.useState(false);
    const btnRef = React.createRef();
    const tooltipRef = React.createRef();

    const openLeftTooltip = () => {
        new Popper(btnRef.current, tooltipRef.current, {placement: "right"});
        setTooltipShow(true);
    };

    const closeLeftTooltip = () => {
        setTooltipShow(false);
    };

    const data = {
        numberOfCameras: {
            title: "Number of Cameras",
            description: "Select the number of cameras expected to be recording. You can mix and match different cameras and resolutions. For example, if you are considering (3) 5 megapixel cameras and (5) 4K cameras, then the total count would be (8) cameras."
        },
        daysOfStorage: {
            title: "Days of Storage",
            description: "Select the total number of days you would like the system to store recorded video for all cameras."
        },
        recordingType: {
            title: "Recording",
            description: "Each camera can be programmed to record on continuous and motion activated schedules. They can be set to Continuous Recording (record 24 hours) or Motion Recording (record when motion is detected) - or a combination of both." 
        },
        videoFormat: {
            title: "Video Format",
            description: "To maximize hard drive storage, surveillance recorders use video compression (H264 or H265) to reduce the videos file size. H264 has been used for years and is the industry standard. H265 is new and can reduce the file size 50% over H264, providing the most storage capability. The tradeoff is that H265 requires a higher data processing workload on the processor. Our systems are capable of supporting both versions of video compression. Each camera can be independently programed to record using H264 or H265, depending on your preference.",
            second_paragraph: "We recommend using “Continuous Recording” to start your calculations. First select the minimum days of storage you need based on “Continuous Recording” and then use “Motion Recording” to increase the total number of stored days beyond that point, or reduce the size of the hard drive. Keep in mind that most of our recorders allow you to add hard drives as needed (2-4 hard drive bays depending on the model). However, if you need more hard drives than the recorder can support, consider using our Pro-HD100 expanded storage unit. The unit allows you to easily add 4 more hard drives to your system.",
        },
        resolution: {
            title: "Resolution",
            description: "Cameras with different resolutions can be used on the same system. For example, a system may have several 3K cameras, several 4K cameras and perhaps some PTZ cameras. All can record in different resolutions. When calculating hard drive storage, we recommend using your best judgement. If most of the cameras are 4K resolution then it is reasonable to select 4K (8 megapixel). If half of the cameras are 4K and half are 3K, then we recommend selecting the higher resolution; in this case being 4K resolution."
        },
        videoQuality: {
            title: "Video Quality",
            description: "In addition to a cameras resolution, the “Bit Rate” can impact the clarity of the video. Bit rate is a software adjustment located in the video recorder. As the bit rate is increased, the video becomes sharper but the file size increases. To calculate the storage requirements for the sharpest video, select “High”. The storage tool will recalculate the required storage based on the larger file size. For most applications, “Normal” should be selected to calculate storage"
        },
        fps: {
            title: "Frames per second",
            description: "Live video is 30 frames per second (fps). This produces the smoothest video but also the largest file sizes. For reference, Hollywood Movies are filmed at 24fps. Since the human eye does not commonly notice a drastic difference between 30fps and 20fps, you can choose to use 20-24fps for storage calculations. This simple reduction in frames provides a 27-30% increase in the total number of days stored. Even lower low frame rates (such as 15fps) will decrease the hard drive size needed or increase the total number of days that can be stored."
        }
    }

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full text-center">
                    <button className="inline-block align-center text-white ml-2 border rounded-full bg-green-600 cursor-pointer hover:bg-green-400" type="button"
                        style={
                            {transition: "all .15s ease"}
                        }
                        onMouseEnter={openLeftTooltip}
                        onMouseLeave={closeLeftTooltip}
                        ref={btnRef}>
                        <BsInfo/>
                    </button>
                    <div className={
                            (tooltipShow ? "" : "hidden ") + "bg-gray-tooltip bg-opacity-95 border-0 ml-3 block z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg"
                        }
                        ref={tooltipRef}>
                        <div>
                            <div className={
                                "bg-gray-tooltip bg-opacity-95 text-white opacity-90 font-semibold p-3 mb-0 border-b border-solid border-gray-200 uppercase rounded-t-lg"
                            }>
                                {data[inputType].title}
                            </div>
                            <div className="text-white p-3">
                                {data[inputType].description}
                                {data[inputType]?.second_paragraph && <span><br/><br/></span>}
                                {data[inputType]?.second_paragraph}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
