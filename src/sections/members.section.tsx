import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { GlowLink } from '../components/glow-box-link';
import { SectionTitle } from '../components/section-title.component';

export type Member = { id: string; name: string; role: string };

export const members: Member[] = [
	{ id: 'lucky', name: 'Kagabo Irene Lucky', role: 'Cheif Executive Officer' },
	{ id: 'christian', name: 'Isingizwe Christian Bizimana', role: 'Cheif Operating Officer' },
	{ id: 'aine', name: 'Dushimire Aine', role: 'Cheif Technology Officer' },
	{ id: 'livia', name: 'Kirezi Livia', role: 'Cheif Marketing Officer' },
	{ id: 'theogene', name: 'Niyirera Theogene', role: 'Cheif Sales Officer' },
];

export const MembersSection = () => {
	return (
		<section className='container members-section' id='members'>
			<div>
				<SectionTitle title='Members' />
			</div>
			<div className='members-grid'>
				{members.map((m) => (
					<div key={m.id} className='member-card'>
						<div className='avatar' aria-hidden>
							<span>{m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>
						</div>
						<div className='member-meta'>
							<h3>{m.name}</h3>
							<p className='role'>{m.role}</p>
							<div className='socials'>
								<GlowLink href='' color='rgba(37,211,102,0.6)' icon={<FaWhatsapp color='rgb(37,211,102)' />} aria-label='whatsapp' />
								<GlowLink href='' color='rgba(0,160,220,0.6)' icon={<FaLinkedinIn color='rgb(0,160,220)' />} aria-label='linkedin' />
								<GlowLink href='' color='rgba(225,48,108,0.6)' icon={<FaInstagram color='rgb(225,48,108)' />} aria-label='instagram' />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
