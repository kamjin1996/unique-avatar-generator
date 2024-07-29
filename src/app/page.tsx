import Generator from './generator/page'
import {SiGithub} from "react-icons/si";

export default function Home() {
    return (
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-8 dark:bg-gray-900">
                <div className='w-full'>
                    <div className='flex justify-end '>
                        <a href='https://github.com/kamjin1996/unique-avatar-generator'>
                            <SiGithub size={26}></SiGithub>
                        </a>
                    </div>
                </div>
                <div>
                    <div
                        className='text-4xl bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text md:text-5xl font-bold mb-4 text-center'>Generate
                        a unique avatar based on the text.
                    </div>

                    <Generator></Generator>

                    <div className='flex flex-col items-center mt-18'>
                        <div className='mt-16'></div>
                        <div className='text-gray-500'>Copyright © 2024 Unique Avatar Generator | Kamjin. All rights
                            reserved.
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
