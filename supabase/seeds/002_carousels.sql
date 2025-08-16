delete from carousels;

INSERT INTO public.carousels(link,image,title,points) VALUES
('/contact','/tmp/car1.png','Contact Us','{"Contact us via whatsapp","Contact us via email","Contact us via phone"}'),
('/about','/tmp/car2.png','About Us','{"About our company","Our mission and vision","Meet the team"}'),
('/services','/tmp/car1.png','Our Services','{"Web Development","Mobile App Development","Digital Marketing"}'),
('/portfolio','/tmp/car2.png','Our Portfolio','{"Recent Projects","Client Testimonials","Case Studies"}'),
('/blog','/tmp/car1.png','Blog','{"Latest Articles","Industry News","Tips and Tricks"}'),
('/faq','/tmp/car2.png','FAQ','{"Frequently Asked Questions","Support","Help Center"}'),
('/testimonials','/tmp/car1.png','Testimonials','{"Client Feedback","Success Stories","Reviews"}'),
('/careers','/tmp/car2.png','Careers','{"Job Openings","Company Culture","Internships"}'),
('/events','/tmp/car1.png','Events','{"Upcoming Events","Webinars","Workshops"}'),
('/news','/tmp/car2.png','News','{"Latest News","Press Releases","Media Coverage"}');

select * from carousels;

