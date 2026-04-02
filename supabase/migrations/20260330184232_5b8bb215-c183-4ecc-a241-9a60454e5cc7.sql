
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'web',
  image_url TEXT,
  video_url TEXT,
  view_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Anyone can view projects (public portfolio)
CREATE POLICY "Projects are viewable by everyone"
ON public.projects FOR SELECT USING (true);

-- Only authenticated users can manage projects
CREATE POLICY "Authenticated users can insert projects"
ON public.projects FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
ON public.projects FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects FOR DELETE TO authenticated USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with existing projects
INSERT INTO public.projects (title, description, category, view_url, github_url, is_featured, display_order) VALUES
('HR Analytics Dashboard (Power BI)', 'Developed an interactive HR Analytics dashboard using Power BI to analyze employee demographics, salary trends, working hours, and workforce distribution.', 'data', '#', 'https://github.com/gowthampandiyank/hr_dataset', true, 1),
('ABC Power BI Dashboard', 'A complete data analysis dashboard built in Power BI to analyze student admissions, revenue, age groups, monthly trends, and course-wise performance.', 'data', '#', 'https://github.com/gowthampandiyank/ABC', true, 2),
('Portfolio Website', 'A clean and responsive personal portfolio website built using HTML, CSS, and JavaScript.', 'web', 'https://gowthampandiyank.github.io/Portfolio-Gowtham/', 'https://github.com/gowthampandiyank/Portfolio-Gowtham', false, 3),
('Calculator App', 'A simple and clean calculator application built using JavaScript, with full keyboard support.', 'web', 'https://gowthampandiyank.github.io/Calculator/', 'https://github.com/gowthampandiyank/Calculator', false, 4),
('Real-time Weather App', 'A real-time weather application built using JavaScript and a public weather API.', 'web', 'https://gowthampandiyank.github.io/Whether/', 'https://github.com/gowthampandiyank/Whether', false, 5),
('Personal Info Card', 'A clean and responsive personal profile card built using HTML, CSS, and JavaScript with interactive hover animations.', 'web', 'https://gowthampandiyank.github.io/', 'https://github.com/gowthampandiyank/gowthampandiyank.github.io', false, 6);
