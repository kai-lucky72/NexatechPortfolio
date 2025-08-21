import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';

import { GlowLink } from '../components/glow-box-link';
import { TextHover } from '../components/text-hover.component';

export const InfoSection = () => {
	return (
		<div className='hero-section' id='home'>
			<p>Hi, We are</p>
			<TextHover
				text='NEXATECH RWANDA'
				className='name'
			/>
			<p>Digital Productivity & Intelligence Ecosystem</p>
			{/* Global floating nav boxes handle navigation */}

			<div className='blur'></div>
			<div className='bottom-bar'>
				<GlowLink
					href=''
					color='rgba(225, 48, 108, 0.6)'
					icon={<FaInstagram color='rgb(225, 48, 108)' />}
					aria-label='instagram'
				/>
				<GlowLink
					href=''
					color='rgb(0, 160, 220, 0.6)'
					icon={<FaLinkedinIn color='rgb(0, 160, 220)' />}
					aria-label='linkedin'
				/>
				<GlowLink
					href='mailto:nexatech317@gmail.com'
					icon={<IoMailOutline color='rgb(18, 122, 209)' />}
					color=' rgb(18, 122, 209,0.7)'
					aria-label='mail'
				/>
			</div>
		</div>
	);
};
