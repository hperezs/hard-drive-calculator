import { useEffect, useState } from 'react';
import {BsInfo} from 'react-icons/bs'

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

    const input_styles = "ml-5 mt-1 rounded border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 "; 
    const radio_styles = "mr-3 my-3 border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50 ";
    const info_styles = "inline-block align-bottom ml-2 border rounded-full bg-gray-50 cursor-pointer hover:bg-gray-100";

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
        <section className="m-10 border rounded p-10 text-xl flex flex-row justify-center">
            <div className="flex flex-row justify-between sm:w-full md:w-8/12 lg:w-6/12 xl:w-5/12 2xl:4/12">
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

                    <div className="my-5">
                        <p className="mb-3">Select a video format:<span className={info_styles}><BsInfo /></span></p>
                        <div className="flex flex-row" onChange={handleChanges}>
                            <div className="flex items-center ml-3 mr-5">
                                <input 
                                    type="radio" 
                                    id="h264" 
                                    name="videoFormat" 
                                    value="h264" 
                                    className={radio_styles + "cursor-pointer"}
                                    checked={videoFormat == 'h264'}
                                />
                                <label for="h264" className="cursor-pointer font-light">H264</label>
                            </div>

                            <div className="flex items-center ml-3">
                                <input 
                                    type="radio" 
                                    id="h265" 
                                    name="videoFormat" 
                                    value="h265" 
                                    className={radio_styles + "cursor-pointer"}
                                    checked={videoFormat == 'h265'}
                                />
                                <label for="h265" className="cursor-pointer font-light">H265</label>
                            </div>
                        </div>
                        
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

                    <div className="my-5" onChange={handleChanges}>
                        <p className="mb-3">Video Quality:<span className={info_styles}><BsInfo /></span></p>

                        <div className="flex items-center ml-3">
                            <input 
                                type="radio" 
                                id="highQuality" 
                                name="videoQuality" 
                                value="high" 
                                className={radio_styles + "cursor-pointer"}
                                checked={videoQuality == 'high'}    
                            />
                            <label for="highQuality" className="cursor-pointer font-light">High</label>
                        </div>
                        
                        <div className="flex items-center ml-3">
                            <input 
                                type="radio" 
                                id="mediumQuality" 
                                name="videoQuality" 
                                value="medium" 
                                className={radio_styles + "cursor-pointer"}
                                checked={videoQuality == 'medium'}    
                            />
                            <label for="mediumQuality" className="cursor-pointer font-light">Medium</label>
                        </div>

                        <div className="flex items-center ml-3">
                            <input 
                                type="radio" 
                                id="lowQuality" 
                                name="videoQuality" 
                                value="low" 
                                className={radio_styles + "cursor-pointer"}
                                checked={videoQuality == 'low'}    
                            />
                            <label for="lowQuality" className="cursor-pointer font-light">Low</label>
                        </div>
                    </div>

                    <div className="my-5" onChange={handleChanges}>
                        <p className="mb-3">Scene Activity:<span className={info_styles}><BsInfo /></span></p>

                        <div className="flex items-center ml-3">
                            <input 
                                type="radio" 
                                id="highActivity" 
                                name="sceneActivity" 
                                value="high" 
                                className={radio_styles + "cursor-pointer"}
                                checked={sceneActivity == 'high'}
                            />
                            <label for="highActivity" className="cursor-pointer font-light">High</label>
                        </div>
                        
                        <div className="flex items-center ml-3">
                            <input 
                                type="radio" 
                                id="mediumActivity" 
                                name="sceneActivity" 
                                value="medium" 
                                className={radio_styles + "cursor-pointer"}
                                checked={sceneActivity == 'medium'}
                            />
                            <label for="mediumActivity" className="cursor-pointer font-light">Medium</label>
                        </div>

                        <div className="flex items-center ml-3">
                            <input 
                                type="radio" 
                                id="lowActivity" 
                                name="sceneActivity" 
                                value="low" 
                                className={radio_styles + "cursor-pointer"}
                                checked={sceneActivity == 'low'}    
                            />
                            <label for="lowActivity" className="cursor-pointer font-light">Low</label>
                        </div>
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
                    {/* TODO: Results */}
                    <div className="p-5 border rounded">
                        <h4 className="text-2xl mb-3">Storage Capacity Required</h4>
                        <span>{requiredStorage} TB</span>
                    </div>
                </div>
            </div>
        </section>
    )
}