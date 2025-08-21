import { BiLogoTypescript } from 'react-icons/bi';
import { DiMongodb, DiMsqlServer } from 'react-icons/di';
import { FaBootstrap, FaNodeJs, FaReact } from 'react-icons/fa';
import {
	SiExpress,
	SiFastify,
	SiSpringboot,
	SiPython,
	SiPhp,
	SiMui,
	SiMysql,
	SiShadcnui,
	SiTailwindcss,
	SiFigma,
	SiBlender,
	SiPostgresql,
	SiDotnet,
	SiAmazon,
} from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { AiOutlineCloud } from 'react-icons/ai';

import { GlowBox } from '../components/glow-box';
import { SectionTitle } from '../components/section-title.component';

const techs = [
	{
		heading: 'Core Tech Stack',
		items: [
			{
				title: 'Next JS',
				icon: <TbBrandNextjs color='rgb(255, 255, 255)' />,
				color: 'rgba(255, 255, 255, 0.4)',
			},
			{
				title: 'React JS',
				icon: <FaReact color='rgb(97, 219, 251)' />,
				color: 'rgb(97, 219, 251, 0.6)',
			},
			{
				title: 'Node JS',
				icon: <FaNodeJs color='rgb(104, 160, 99)' />,
				color: 'rgb(104, 160, 99)',
			},
			{
				title: 'TypeScript',
				icon: <BiLogoTypescript color='rgb(0, 122, 204)' />,
				color: 'rgba(0, 122, 204, 0.6)',
			},
			{
				title: 'Fastify',
				icon: <SiFastify color='rgba(255, 255, 255)' />,
				color: 'rgba(255, 255, 255, 0.4)',
			},
			{
				title: 'Express JS',
				icon: <SiExpress color='rgba(255, 255, 255)' />,
				color: 'rgba(255, 255, 255, 0.4)',
			},
			{
				title: 'Spring Boot',
				icon: <SiSpringboot color='rgb(0, 179, 89)' />,
				color: 'rgba(0, 179, 89, 0.6)',
			},
			{
				title: 'C# / .NET',
				icon: <SiDotnet color='rgb(90, 36, 162)' />,
				color: 'rgba(90, 36, 162, 0.6)',
			},
			{
				title: 'Python',
				icon: <SiPython color='rgb(53, 114, 165)' />,
				color: 'rgba(53, 114, 165, 0.7)',
			},
			{
				title: 'PHP',
				icon: <SiPhp color='rgb(119, 123, 178)' />,
				color: 'rgba(119, 123, 178, 0.7)',
			},
		],
	},
	{
		heading: 'UI & Styling',
		items: [
			{
				title: 'Material UI',
				icon: <SiMui color='rgb(0, 127, 255)' />,
				color: 'rgb(0, 127, 255, 0.6)',
			},
			{
				title: 'ShadCn UI',
				icon: <SiShadcnui color='rgb(255, 255, 255)' />,
				color: 'rgba(255, 255, 255, 0.4)',
			},
			{
				title: 'Tailwind CSS',
				icon: <SiTailwindcss color='rgb(6, 182, 212)' />,
				color: 'rgb(6, 182, 212, 0.7)',
			},
			{
				title: 'Bootstrap',
				icon: <FaBootstrap color='rgb(125, 17, 248)' />,
				color: 'rgb(125, 17, 248, 0.75)',
			},
			{
				title: 'Figma',
				icon: <SiFigma color='rgb(242, 78, 30)' />,
				color: 'rgba(242, 78, 30, 0.6)',
			},
			{
				title: 'Blender',
				icon: <SiBlender color='rgb(245, 128, 37)' />,
				color: 'rgba(245, 128, 37, 0.7)',
			},
			// Optionally add ShadCn here
		],
	},
	{
		heading: 'Storage Tech',
		items: [
			{
				title: 'MsSQL',
				icon: <DiMsqlServer color='rgb(230, 50, 42)' />,
				color: 'rgb(241, 83, 75, 0.5)',
			},
			{
				title: 'MongoDB',
				icon: <DiMongodb color='rgb(0, 237, 100)' />,
				color: 'rgb(0, 237, 100, 0.7)',
			},
			{
				title: 'MySQL',
				icon: <SiMysql color='rgb(0, 122, 158)' />,
				color: 'rgb(0, 122, 158, 0.75)',
			},
			{
				title: 'PostgreSQL',
				icon: <SiPostgresql color='rgb(49, 99, 140)' />,
				color: 'rgba(49, 99, 140, 0.75)',
			},
			{
				title: 'AWS',
				icon: <SiAmazon color='rgb(255, 153, 0)' />,
				color: 'rgba(255, 153, 0, 0.7)',
			},
			{
				title: 'Azure',
				icon: <AiOutlineCloud color='rgb(0, 120, 212)' />,
				color: 'rgba(0, 120, 212, 0.7)',
			},
		],
	},
];

export const TechStack = () => {
	return (
		<section
			className='tech-stack'
			id='tech-stack'
		>
			<div className='tech-grid'>
				{techs.map((tech, index) => (
					<div key={index}>
						<p>{tech.heading}</p>
						<div className='tech-row'>
							{tech.items.map((item, index) => (
								<GlowBox
									key={index}
									icon={item.icon}
									color={item.color}
									title={item.title}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<div>
				<SectionTitle
					title='Tech'
					subTitle='SET'
				/>
			</div>
		</section>
	);
};
