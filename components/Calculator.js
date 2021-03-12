import { useEffect, useState } from 'react';
import {BsInfo} from 'react-icons/bs';
import Image from 'next/image';

export default function Calculator() {
    const [numberOfCameras, setNumberOfCameras] = useState(1);
    const [daysOfStorage, setDaysOfStorage] = useState(1);
    const [hoursPerDay, setHoursPerDay] = useState(8);
    const [videoFormat, setVideoFormat] = useState("h264");
    const [resolution, setResolution] = useState(8294400);
    const [videoQuality, setVideoQuality] = useState("medium");
    const [sceneActivity, setSceneActivity] = useState("medium");
    const [fps, setFps] = useState(20);
    const [formatQualityActivity, setFormatQualityActivity] = useState(0);
    const [requiredStorage, setRequiredStorage] = useState('---');

    const KILOBYTE = 1000;

    // Calculate formatQualityActivity whenever values change
    useEffect(() => {
        switch(videoFormat){
            case('h264'):
                switch(videoQuality) {
                    case 'high':
                        switch(sceneActivity) {
                            case 'high':
                                setFormatQualityActivity(98);
                                break;
                            case 'medium':
                                setFormatQualityActivity(102);
                                break;
                            case 'low':
                                setFormatQualityActivity(105);
                                break;
                        }
                        break;
                    case 'medium':
                        switch(sceneActivity) {
                            case 'high':
                                setFormatQualityActivity(160);
                                break;
                            case 'medium':
                                setFormatQualityActivity(173);
                                break;
                            case 'low':
                                setFormatQualityActivity(181);
                                break;
                        }
                        break;
                    case 'low':
                        switch(sceneActivity) {
                            case 'high':
                                setFormatQualityActivity(220);
                                break;
                            case 'medium':
                                setFormatQualityActivity(242);
                                break;
                            case 'low':
                                setFormatQualityActivity(260);
                                break;
                        }
                        break;
                }
                break;
            case('h265'):
                switch(videoQuality) {
                    case 'high':
                        switch(sceneActivity) {
                            case 'high':
                                setFormatQualityActivity(260);
                                break;
                            case 'medium':
                                setFormatQualityActivity(272);
                                break;
                            case 'low':
                                setFormatQualityActivity(282);
                                break;
                        }
                        break;
                    case 'medium':
                        switch(sceneActivity) {
                            case 'high':
                                setFormatQualityActivity(480);
                                break;
                            case 'medium':
                                setFormatQualityActivity(510);
                                break;
                            case 'low':
                                setFormatQualityActivity(536);
                                break;
                        }
                        break;
                    case 'low':
                        switch(sceneActivity) {
                            case 'high':
                                setFormatQualityActivity(620);
                                break;
                            case 'medium':
                                setFormatQualityActivity(670);
                                break;
                            case 'low':
                                setFormatQualityActivity(710);
                                break;
                        }
                        break;
                }
                break;
        }
    }, [videoFormat, videoQuality, sceneActivity])

    useEffect(() => {
        let colorPixelSize = (resolution < 824400 ? 16 : 30)
        let requiredBandwith = resolution * colorPixelSize * fps * numberOfCameras / formatQualityActivity;
        let bytesTotal = requiredBandwith / 8 * 86400 * daysOfStorage * (hoursPerDay / 24);
        let terabytes = (bytesTotal / (KILOBYTE * KILOBYTE * KILOBYTE * KILOBYTE)).toFixed(3);

        console.log(requiredBandwith);
        console.log(bytesTotal);
        console.log(terabytes);
        setRequiredStorage(terabytes);
    }, [formatQualityActivity, resolution, numberOfCameras, fps, daysOfStorage, hoursPerDay])

    const input_styles = "ml-5 mt-1 border-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 "; 
    const radio_styles = "mr-3 my-3 border-gray-300 text-green-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 ";
    const info_styles = "inline-block align-bottom ml-1 mb-1 border rounded-full bg-gray-50 cursor-pointer hover:bg-gray-100";

    const numberOfCameras_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 24, 32, 48, 64];

    const hoursPerDay_options = [];
    for(let i = 1; i <= 24; i++) {
        hoursPerDay_options.push(<option>{i}</option>);
    }

    const fps_options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 30];

    const handleChanges = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        switch(name) {
            case 'numberOfCameras':
                setNumberOfCameras(value);
                break;
            case 'daysOfStorage':
                setDaysOfStorage(value);
                break;
            case 'hoursPerDay':
                setHoursPerDay(value);
                break;
            case 'videoFormat': 
                setVideoFormat(value);
                break;
            case 'resolution':
                setResolution(value);
                console.log(value);
                break;
            case 'videoQuality':
                setVideoQuality(value);
                break;
            case 'sceneActivity':
                setSceneActivity(value);
                break;
            case 'fps':
                setFps(value);
                break;
        }
    }

    return(
        <>
        <div className="w-full flex flex-row justify-center">
            <Image src='/images/header.png' width={900} height={104}/>
        </div>
        
        <div className="flex flex-row justify-center">
        <section className="border-2 border-purple-300 w-900 p-10 text-xl ">
            <div className="flex flex-row justify-between ">
                <div className="flex flex-col justify-evenly w-5/12">
                    <div className="my-5 flex flex-row justify-between items-center">
                        <label for="numberOfCameras">Number of cameras:</label>
                        <select 
                            name="numberOfCameras" 
                            className={input_styles + "w-24"}
                            value={numberOfCameras}
                            onChange={handleChanges}
                        >
                            {numberOfCameras_options.map(number => {
                                return(<option key={number}>{number}</option>)
                            })}
                        </select>
                    </div>

                    <div className="my-5 flex flex-row justify-between items-center">
                        <label for="daysOfStorage">Days of storage:</label>
                        <input 
                            name="daysOfStorage" 
                            type="number" 
                            className={input_styles + "w-24"} 
                            value={daysOfStorage}
                            onChange={handleChanges}
                        />
                    </div>

                    <div className="my-5 flex flex-row justify-between items-center">
                        <label for="hoursPerDay">Hours per day:</label>
                        <select 
                            name="hoursPerDay" 
                            className={input_styles + "w-24"}
                            value={hoursPerDay}
                            onChange={handleChanges}
                        >
                            {hoursPerDay_options}
                        </select>
                    </div>

                    <div className="my-5 flex flex-row items-center justify-between">
                        <label for="videoFormat" className="">Video format:<span className={info_styles}><BsInfo /></span></label>
                            <select 
                                name="videoFormat" 
                                value={videoFormat} 
                                className={input_styles} 
                                onChange={handleChanges}
                            >
                                <option value="h264">H264</option>
                                <option value="h265">H265</option>
                            </select>
                    </div>
                    
                    <div className="my-5 flex flex-row items-center justify-between">
                        <label for="resolution">Resolution:</label>
                        <select name="resolution" className={input_styles} value={resolution} onChange={handleChanges}>
                            <option value={8294400}>8MP (4K)</option>
                            <option value={6291456}>6MP (3072x2048)</option>
                            <option value={5038848}>5MP (2592x1944)</option>
                            <option value={4085760}>4MP (2688x1520)</option>
                            <option value={3145728}>3MP (2048x1536)</option>
                            <option value={2073600}>2MP (1920x1080)</option>
                            <option value={921600}>1MP (1280x720)</option>
                        </select>
                    </div>

                    <div className="my-5 flex flex-row items-center justify-between">
                        <label for="videoQuality" className="">Video Quality:<span className={info_styles}><BsInfo /></span></label>
                            <select 
                                name="videoQuality" 
                                value={videoQuality} 
                                className={input_styles} 
                                onChange={handleChanges}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                    </div>

                    <div className="my-5 flex flex-row items-center justify-between">
                        <label for="videoQuality" className="">Video Quality:<span className={info_styles}><BsInfo /></span></label>
                            <select 
                                name="sceneActivity" 
                                value={sceneActivity} 
                                className={input_styles} 
                                onChange={handleChanges}
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                    </div>

                    <div className="flex flex-row items-center justify-between">
                        <span>Frames per second (FPS):</span>
                        <select 
                            className={input_styles}
                            name="fps"
                            value={fps}
                            onChange={handleChanges}    
                        >
                            {fps_options.map(number => {
                                return(<option>{number}</option>)
                            })}
                        </select>
                    </div>
                </div>
                
                <div className="w-5/12 flex flex-col">
                    <div className="p-5 border-2 border-purple-700 mt-5 mb-10">
                        <h4 className="text-2xl mb-3">Storage Capacity Required</h4>
                        <span>{requiredStorage} TB</span>
                    </div>
                        
                    <div className="flex flex-row justify-center">
                        <div className="p-5 border border-purple-300 flex flex-col justify-center items-center cursor-pointer hover:shadow-lg">
                            <h5 className="text-xl mb-3">Recommended Product</h5>
                            <div className="py-5">
                                <div className=""><Image src='/images/hard_drive_hero.jpg' alt='hard-drive-hero' width={180} height={144}/></div>
                                <span className="text-lg font-light m-3">2T Hard Drive</span>
                                <span className="block ml-3 text-base text-yellow-600">$49.99</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        
        </div>
        </>
    )
}