'use client'
import {useEffect, useState} from "react";

const Page = () => {
    const [avatar, setAvatar] = useState('');

    enum SelectType {
        emoji = 'emoji',
        geometry = 'geometry'
    }

    const [selectType, setSelectType] = useState<SelectType>(SelectType.emoji);
    const [width, setWidth] = useState(256);
    const [emailOrText, setEmailOrText] = useState('');

    useEffect(() => {
        handleGenerate()
    }, [emailOrText, selectType,width])

    function handleGenerate() {
        let avatar;
        if (selectType === SelectType.emoji) {
            avatar = generateAvatarEmoji(emailOrText, width)
        } else if (selectType === SelectType.geometry) {
            avatar = generateAvatarGeometry(emailOrText, width)
        }
        setAvatar(avatar!)
    }

    function handleDownload() {
        const link = document.createElement('a');
        link.href = avatar;
        link.download = `avatar-${width}x${width}-${emailOrText}.png`;
        link.click();
    }

    function generateAvatarEmoji(input?: string, size = 200, allowOverlap = true) {
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

        // 生成随机数量的emoji
        const numEmojis = 3 + (Math.abs(hash) % 5);
        const emojis = ["😀", "😂", "🤣", "😊", "😍", "🤔", "😎", "🥳", "😜", "🤩"];

        const positions = [];

        if (allowOverlap) {
            for (let i = 0; i < numEmojis; i++) {
                const emoji = emojis[Math.abs(hash + i) % emojis.length];
                const fontSize = size / 4 + (Math.abs(hash + i) % (size / 4));
                const angle = (Math.abs(hash + i * i) % 360) * Math.PI / 180;
                const x = (Math.abs(hash + i * i) % (size - fontSize));
                const y = (Math.abs(hash + i * i * i) % (size - fontSize));

                // 保存当前的canvas状态
                ctx.save();

                // 移动到emoji的绘制位置
                ctx.translate(x + fontSize / 2, y + fontSize / 2);
                // 旋转canvas
                ctx.rotate(angle);

                // 设置字体大小
                ctx.font = `${fontSize}px Arial`;
                // 设置文本对齐方式
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // 绘制emoji
                ctx.fillText(emoji, 0, 0);

                // 恢复canvas状态
                ctx.restore();
            }
        } else {
            // 计算网格大小
            const gridSize = Math.ceil(Math.sqrt(numEmojis));
            const cellSize = size / gridSize;

            // 网格坐标
            let gridPositions = [];
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    gridPositions.push({row, col});
                }
            }

            // 打乱网格坐标
            gridPositions = gridPositions.sort(() => (Math.random() > 0.5) ? 1 : -1);

            for (let i = 0; i < numEmojis; i++) {
                const emoji = emojis[Math.abs(hash + i) % emojis.length];
                const fontSize = cellSize / 2 + (Math.abs(hash + i) % (cellSize / 2));
                const angle = (Math.abs(hash + i * i * i) % 360) * Math.PI / 180;
                const {row, col} = gridPositions[i % gridPositions.length];
                const x = col * cellSize + (cellSize - fontSize) / 2;
                const y = row * cellSize + (cellSize - fontSize) / 2;

                // 保存当前的canvas状态
                ctx.save();

                // 移动到emoji的绘制位置
                ctx.translate(x + fontSize / 2, y + fontSize / 2);
                // 旋转canvas
                ctx.rotate(angle);

                // 设置字体大小
                ctx.font = `${fontSize}px Arial`;
                // 设置文本对齐方式
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                // 绘制emoji
                ctx.fillText(emoji, 0, 0);

                // 恢复canvas状态
                ctx.restore();
            }
        }

        // 将canvas转换为数据URL
        return canvas.toDataURL();
    }


    function generateAvatarGeometry(input?: string, size = 256) {
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

    const handleSelectType = (e: any) => {
        setSelectType(e.target.value);
    };

    return (
        <div className='flex flex-col justify-center items-center space-y-4 mt-12'>
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
                    }} defaultValue="256">
                        <option value="64">64x64</option>
                        <option value="128">128x128</option>
                        <option value="256">256x256</option>
                        <option value="512">512x512</option>
                        <option value="1024">1024x1024</option>
                    </select>
                </div>

                <div className='flex ml-4 items-center'>
                    <div className='ml-4 space-x-1 mt-4 cursor-pointer' onClick={() => setSelectType(SelectType.emoji)}>
                        <input
                            type="radio"
                            value={SelectType.emoji}
                            checked={selectType === SelectType.emoji}
                            onChange={handleSelectType}
                        />
                        <label style={{textDecoration: selectType === 'emoji' ? '' : 'none'}}>Emoji</label>
                    </div>

                    <div className='ml-4 space-x-1 mt-4 cursor-pointer'
                         onClick={() => setSelectType(SelectType.geometry)}>
                        <input
                            type="radio"
                            value={SelectType.geometry}
                            checked={selectType === SelectType.geometry}
                            onChange={handleSelectType}
                        />
                        <label
                            style={{textDecoration: selectType === SelectType.geometry ? '' : 'none'}}>Geometry</label>
                    </div>
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
