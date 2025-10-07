-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  categories TEXT[] DEFAULT '{}',
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  external_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('completed', 'in-development', 'upcoming', 'testing')),
  status_color TEXT DEFAULT '#3b82f6',
  external_url TEXT,
  github_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  company_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  website TEXT,
  linkedin TEXT,
  twitter TEXT,
  facebook TEXT,
  instagram TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  avatar_url TEXT,
  image_url TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default contact info
INSERT INTO contact_info (email, phone, address, company_name, tagline) 
VALUES (
  'nexatech317@gmail.com',
  '+250723374650',
  'Kigali, Rwanda',
  'NexaTech Rwanda',
  'Africa''s Next Tech Hub'
) ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blogs (title, excerpt, image_url, categories, author, published_at, external_url) VALUES
(
  'Building Rwanda''s Cloud Infrastructure: The Future of African Tech',
  'Exploring how Rwanda is positioning itself as Africa''s cloud computing hub through innovative infrastructure and government partnerships.',
  '/3d-layered-technology-stack-purple-blue-gradient.jpg',
  ARRAY['AI For Business', 'Marketing'],
  'Vincent Pham',
  '2025-04-18T00:00:00Z',
  'https://medium.com/@nexatechrwanda/building-rwandas-cloud-infrastructure-the-future-of-african-tech'
),
(
  'Securing Africa''s Digital Transformation: A Rwanda Perspective',
  'A comprehensive look at cybersecurity challenges and solutions in Africa''s digital transformation journey.',
  '/cybersecurity-digital-shield-computer-screen.jpg',
  ARRAY['AI For Business', 'Marketing'],
  'NexaTech Team',
  '2025-04-18T00:00:00Z',
  'https://techcrunch.com/2024/africa-cybersecurity-rwanda-digital-transformation'
),
(
  'How Tech Innovation Is Transforming African Business Ecosystems',
  'Discover how technology is reshaping business landscapes across Africa and creating new opportunities.',
  '/professional-working-at-modern-office-desk-with-la.jpg',
  ARRAY['AI For Business', 'Marketing'],
  'Vincent Pham',
  '2025-03-03T00:00:00Z',
  'https://www.forbes.com/africa/tech-innovation-transforming-african-business-ecosystems'
) ON CONFLICT DO NOTHING;

-- Insert sample team members
INSERT INTO team_members (name, role, bio, avatar_url, linkedin_url, "order") VALUES
(
  'Daniel Vaughn',
  'Chief Technology Officer',
  'Passionate about building Africa''s tech ecosystem and leading innovative solutions.',
  '/professional-man-headshot-smiling.jpg',
  'https://linkedin.com/in/daniel-vaughn',
  1
),
(
  'Sophia Reynolds',
  'IT Director',
  'Dedicated to transforming Rwanda''s digital landscape through strategic technology implementation.',
  '/smiling-professional-woman.png',
  'https://linkedin.com/in/sophia-reynolds',
  2
),
(
  'Michael Carter',
  'Chief Executive Officer',
  'Visionary leader driving NexaTech Rwanda''s mission to become Africa''s premier tech hub.',
  '/professional-man-headshot.png',
  'https://linkedin.com/in/michael-carter',
  3
) ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, image_url, category, status, status_color, external_url, "order") VALUES
(
  'Shoppa',
  'Revolutionary shopping platform transforming e-commerce in Rwanda and across Africa. Currently in testing stage and launching soon!',
  '/shoppa.jpg',
  'E-Commerce',
  'testing',
  '#10b981',
  'https://shoppa.nexatechrwanda.com',
  1
),
(
  'AgriChain',
  'Innovative agricultural technology platform connecting farmers, suppliers, and markets through blockchain technology for transparent supply chains.',
  '/agrichain.jpg',
  'Agriculture Tech',
  'in-development',
  '#f59e0b',
  'https://agrichain.nexatechrwanda.com',
  2
),
(
  'JobLink',
  'Smart job matching platform connecting talented Africans with opportunities across the continent, powered by AI-driven recommendations.',
  '/joblink.jpg',
  'Job Platform',
  'in-development',
  '#3b82f6',
  'https://joblink.nexatechrwanda.com',
  3
) ON CONFLICT DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (quote, name, role, avatar_url, image_url, "order") VALUES
(
  'NexaTech Rwanda is more than just a workplace; it''s a family united by the vision of transforming Africa''s tech landscape. The leadership fosters a culture of innovation, collaboration, and growth, ensuring that each team member contributes to Rwanda''s technological advancement.',
  'Daniel Vaughn',
  'Chief Technology Officer',
  '/professional-man-headshot-smiling.jpg',
  '/about.jpg',
  1
),
(
  'Working at NexaTech Rwanda has accelerated my growth in ways I never imagined. Our collaborative teams share a clear vision of making Rwanda the tech hub of Africa, and the continuous learning opportunities make every day exciting and impactful for our continent''s future.',
  'Sophia Reynolds',
  'IT Director',
  '/smiling-professional-woman.png',
  '/client.jpg',
  2
),
(
  'Leaders here empower you to innovate. You''re trusted with ownership and supported with the right tools to succeed.',
  'Michael Carter',
  'Chief Executive Officer',
  '/professional-man-headshot.png',
  '/professional-working-at-modern-office-desk-with-la.jpg',
  3
) ON CONFLICT DO NOTHING;

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Public read access for team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read access for projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access for contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public read access for testimonials" ON testimonials FOR SELECT USING (true);

-- Create policies for admin access (you'll need to implement proper authentication)
CREATE POLICY "Admin full access for blogs" ON blogs FOR ALL USING (true);
CREATE POLICY "Admin full access for team_members" ON team_members FOR ALL USING (true);
CREATE POLICY "Admin full access for projects" ON projects FOR ALL USING (true);
CREATE POLICY "Admin full access for contact_info" ON contact_info FOR ALL USING (true);
CREATE POLICY "Admin full access for testimonials" ON testimonials FOR ALL USING (true);
CREATE POLICY "Admin full access for admin_users" ON admin_users FOR ALL USING (true);

