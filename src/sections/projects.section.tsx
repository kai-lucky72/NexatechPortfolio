import { SectionTitle } from '../components/section-title.component';

export const projects = [
	{
		id: 'shoppa',
		title: 'SHOPPA',
		desc: 'A next-generation e-commerce platform built for Africa. Shoppa empowers small businesses and local sellers to go digital while giving consumers a seamless, trusted, and affordable online shopping experience — integrated with AI-driven product locator for buyers.',
	},
	{
		id: 'agri-chain',
		title: 'AGRI-Chain',
		desc: 'An intelligent agriculture platform connecting farmers, buyers, and distributors in real time. Agri-Chain brings transparency to food supply chains, ensures fair pricing for farmers, and enables governments and businesses to track and optimize food security.',
	},
	{
		id: 'skill-link',
		title: 'Skill-Link',
		desc: 'A marketplace for skilled practical workers. Skill-Link connects jobless workers with employers looking for verified talent, giving workers visibility and helping employers find the right candidate quickly and reliably.',
	},
];

export const ProjectsSection = () => {
	return (
		<section className='container projects-section' id='projects'>
			<div>
				<SectionTitle title='Projects' subTitle='What We Build' />
			</div>
			<div className='projects-grid'>
				{projects.map((p) => (
					<a
						key={p.id}
						href={`/#projects-${p.id}`}
						className='project-card'
						id={`projects-${p.id}`}
					>
						<div className='project-thumb'>
							<div className='img' aria-hidden />
						</div>
						<div className='project-meta'>
							<h3>{p.title}</h3>
						</div>
					</a>
				))}
			</div>
		</section>
	);
};
