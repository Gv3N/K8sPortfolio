// src/components/PortfolioPage.js

import React, { useEffect, useState } from 'react';
import { fetchItems } from '../apiService'; // Assuming fetchItems retrieves the items
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../assets/css/main.css'; // Assuming you placed your CSS in the same directory as PortfolioPage.js

const PortfolioPage = () => {
    const [items, setItems] = useState([]);

    // Fetch items when component loads
    useEffect(() => {
        const loadItems = async () => {
            const itemsData = await fetchItems();
            setItems(itemsData);
        };
        loadItems();
    }, []);

    return (
        <div>            
            {/*Portfolio segment */}
            <div className="is-preload">
                {/* Header */}
                <header id="header">
                    <div className="inner">
                    <h1>Hello, I'm <strong>Baktajivan Pillay</strong>.</h1>
                    {/* 
                    
                    */}
                    <p>
                        Want to manage curated repos? <Link to="/login">Login</Link>
                    </p>
                    </div>
                </header>

                {/* Main Content */}
                <div id="main">

                    {/* About Section */}
                    <section id="one">
                    <header className="major">
                        <h2>About Me</h2>
                    </header>
                    <p>
                        Backend Developer with expertise in the LAMP stack, PHP, and Laravel, passionate about system automation and optimization. Currently expanding my skills in DevOps, including tools like Ansible, Docker, and Kubernetes, I focus on enhancing performance and streamlining processes.
                        <br /><br />
                        With a solid foundation in backend development and a drive for continuous learning, I’m eager to transition into a DevOps role where I can apply my skills to improve software delivery and infrastructure management. Let’s connect to explore how I can contribute to your team and projects.
                    </p>
                    </section>

                    {/* Projects Section */}
                    <section id="two">
                    <h2>Projects</h2>
                    <div className="row">
                        {/* DB ->id, name, description, repo_url, external_urls [array] */}
                        {items.map(item => (
                            <article key={item.id} className="col-6 col-12-xsmall work-item">
                                <h3>{item.name}</h3>{/* Project Name */}
                                <p>{item.description}</p>{/* Project Description */}
                                <a href={item.repo_url.startsWith('https') ? item.repo_url : `https://${item.repo_url}`} target="_blank" rel="noopener noreferrer">
                                    <i className='bx bx-code-alt'></i> {/* Project Source Code Link */}
                                </a>
                                {item.external_url && (
                                    <a href={item.external_url.startsWith('https') ? item.external_url : `https://${item.external_url}`} target="_blank" rel="noopener noreferrer">
                                        <i className="fas fa-external-link-alt"></i> {/* Project External Link */}
                                    </a>
                                )}
                            </article>
                        ))}
                        
                        {/** 
                        <article className="col-6 col-12-xsmall work-item">
                        <h3>Laravel CRUD Template Generator Package</h3>
                        <p>The laravel crud template generator package simplifies CRUD development in Laravel by generating boilerplate code for create, read, update, and delete operations, enhancing productivity and ensuring maintainable, scalable code following best practices.</p>
                        <a href="https://packagist.org/packages/gv3n/laravel_crud_template_generator"><i className="fas fa-external-link-alt"></i></a>
                        <a href="https://github.com/Gv3N/laravel_crud_template_generator"><i className='bx bx-code-alt'></i></a>
                        </article>

                        <article className="col-6 col-12-xsmall work-item">
                        <h3>Laravel CRUD</h3>
                        <p>Showcase the extensive functionalities of the Laravel framework. The application spans from fundamental CRUD operations to advanced features such as WebSocket and events.</p>
                        <a href="https://github.com/Gv3N/Laravel_CRUD"><i className='bx bx-code-alt'></i></a>
                        </article>

                        <article className="col-6 col-12-xsmall work-item">
                        <h3>PDF FIle Scanner</h3>
                        <p>A pdf file scanner used to scan pdfs in bulk for automation using PyPDF2, textract & nltk libraries in Python.</p>
                        <a href="https://github.com/Gv3N/PDF_File_Scanner"><i className='bx bx-code-alt'></i></a>
                        </article>

                        <article className="col-6 col-12-xsmall work-item">
                        <h3>Organization Application Web Scrapper</h3>
                        <p>Python web scraping using BeautifulSoup4 and Selenium WebDriver for automation.</p>
                        <a href="https://github.com/Gv3N/Python_Web_Scraping_Organization_Application_Filter"><i className='bx bx-code-alt'></i></a>
                        </article>
                        */}
                    </div>
                    <ul className="actions">
                        <li><a href="https://github.com/Gv3N/curated_repo" className="button">More Projects</a></li>
                    </ul>
                    </section>

                    {/* Contact Section */}
                    <section id="three">
                    <h2>Get In Touch</h2>
                    <p>If you would like to get in touch, feel free to reach out via <a href="https://my.linkedin.com/in/baktajivanpillay">LinkedIn</a> or send an email to <a href="mailto:baktajivan@gmail.com">baktajivan@gmail.com.</a></p>
                    </section>

                </div>

                {/* Footer */}
                <footer id="footer">
                    <div className="inner">
                    <ul className="icons">
                        <li><a href="mailto:baktajivan@gmail.com"><i className='bx bx-envelope'></i></a></li>
                        <li><a href="https://my.linkedin.com/in/baktajivanpillay"><i className='bx bxl-linkedin'></i> </a></li>
                    </ul>
                    <ul className="copyright">
                        <li>&copy; {new Date().getFullYear()} BAKTAJIVAN PILLAY</li>
                        <li>Design: <a href="https://html5up.net/strata">Strata by HTML5 UP</a></li>
                    </ul>
                    </div>
                </footer>

            </div>

        </div>
    );
};

export default PortfolioPage;

// index has been merged, and done
//working on portfolio page db get all item loop
//then rename this into portfolio
//clean up files and do final push
//do readme file