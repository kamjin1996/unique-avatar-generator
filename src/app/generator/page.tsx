'use client'
import {useEffect, useState} from "react";

const Page = () => {
    const [avatar, setAvatar] = useState('');
    const [width, setWidth] = useState(200);
    const [emailOrText, setEmailOrText] = useState('');

    useEffect(() => {
        handleGenerate()
    }, [emailOrText])

    function handleGenerate() {
        const avatar = generateAvatar(emailOrText, width)
        setAvatar(avatar)
    }

    function handleDownload() {
        const link = document.createElement('a');
        link.href = avatar;
        link.download = `avatar-${width}x${width}-${emailOrText}.png`;
        link.click();
    }

    function generateAvatar(input?: string, size = 200) {
        if (!input) {
            input = "example@email.com";
        }
        // 创建一个canvas元素
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d') !;

        // 使用输入字符串生成一个简单的哈希
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash = ((hash << 5) - hash) + input.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }

        // 使用哈希值生成颜色
        const hue = Math.abs(hash) % 360;
        const saturation = 70 + (Math.abs(hash) % 30);
        const lightness = 50 + (Math.abs(hash) % 20);

        // 设置背景颜色
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(0, 0, size, size);

        // 生成几何图形
        const numShapes = 3 + (Math.abs(hash) % 5);
        for (let i = 0; i < numShapes; i++) {
            const shapeSize = size / 4 + (Math.abs(hash + i) % (size / 4));
            const x = (Math.abs(hash + i * i) % (size - shapeSize));
            const y = (Math.abs(hash + i * i * i) % (size - shapeSize));

            ctx.beginPath();
            if (i % 3 === 0) {
                // 圆形
                ctx.arc(x + shapeSize / 2, y + shapeSize / 2, shapeSize / 2, 0, 2 * Math.PI);
            } else if (i % 3 === 1) {
                // 矩形
                ctx.rect(x, y, shapeSize, shapeSize);
            } else {
                // 三角形
                ctx.moveTo(x + shapeSize / 2, y);
                ctx.lineTo(x + shapeSize, y + shapeSize);
                ctx.lineTo(x, y + shapeSize);
            }
            ctx.closePath();

            // 使用互补色填充图形
            ctx.fillStyle = `hsl(${(hue + 180) % 360}, ${saturation}%, ${lightness}%)`;
            ctx.fill();
        }

        // 将canvas转换为数据URL
        return canvas.toDataURL();
    }

    return (
        <div className='flex flex-col justify-center items-center space-y-4 mt-20'>
            <div className='flex flex-col flex justify-start items-start'>
                <div>
                    <label>Text: </label> <input className='ml-2 p-2 dark:text-gray-900' onChange={(e) => {
                    setEmailOrText(e.target.value)
                }
                } placeholder="example@email.com"/>
                </div>
                <br></br>
                <div>
                    <label>Width: </label>
                    <select className='ml-2 p-1 dark:text-gray-900' onChange={(e) => {
                        setWidth(parseInt(e.target.value))
                    }} defaultValue="128">
                        <option value="64">64x64</option>
                        <option value="128">128x128</option>
                        <option value="256">256x256</option>
                        <option value="512">512x512</option>
                        <option value="1024">1024x1024</option>
                    </select>
                </div>
            </div>
            <img className='mt-2' width={width} height={100} src={avatar}/>
            <button className='w-40 hover:bg-blue-700 bg-blue-500 rounded px-2 py-1 text-gray-100'
                    onClick={handleDownload}>Download
            </button>
        </div>

    )
}

export default Page;
