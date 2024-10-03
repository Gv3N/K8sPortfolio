
# K8sPortfolio

Welcome to the K8sPortfolio project! This repository hosts a portfolio application built with **React**, **Flask**, and **NGINX**, deployed using **Kubernetes**. The application showcases curated repositories and projects, providing an interactive and engaging way to present your work.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Build and Run with Docker Compose](#build-and-run-with-docker-compose)
- [Kubernetes Deployment](#kubernetes-deployment)
  - [Configuration](#configuration)
  - [Deploying the Application](#deploying-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Interactive Portfolio**: Showcase your projects with detailed descriptions and links.
- **Responsive Design**: The application is designed to be fully responsive and user-friendly.
- **CRUD Operations**: Create, Read, Update, and Delete your projects dynamically.
- **Containerized Deployment**: Utilizing Docker for seamless deployment across different environments.
- **Kubernetes Orchestration**: Efficient management of application components using Kubernetes.

## Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Database**: PostgreSQL
- **Server**: NGINX
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## Architecture

The architecture of the K8sPortfolio application is designed to separate concerns between the frontend, backend, and database services. The architecture consists of:

- **Frontend Service**: Built with React, serves the user interface.
- **Backend Service**: Built with Flask, handles business logic and database interactions.
- **Database Service**: PostgreSQL for storing project data.
- **NGINX Server**: Acts as a reverse proxy to serve the frontend and API requests.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Gv3N/K8sPortfolio.git
cd K8sPortfolio
```

### Build and Run with Docker Compose

To build and run the application locally using Docker Compose, execute the following command:
```bash
docker-compose up --build
```

This will build the Docker images and start the services defined in the `docker-compose.yml` file.

> **Note:** If you decide not to deploy using Kubernetes, you can still access the project locally via Docker Compose by navigating to
> `http://localhost:3000` in your web browser after the build process
> completes. You can also check if the backend is working by visiting `http://localhost:5000/api/check`.

## Kubernetes Deployment

### Configuration

The application is configured for deployment in a Kubernetes cluster. The necessary configurations are defined in the Kubernetes manifest files located in the `k8s/` directory.

### Deploying the Application

To deploy the application to your Kubernetes cluster, follow these steps:

1.  Ensure you have access to your Kubernetes cluster.
2.  Apply the Kubernetes configurations:

```bash
kubectl apply -f k8s/deployment.yaml
```

This command will create the necessary deployments, services, and other resources defined in your Kubernetes manifest files.

## Usage

Once deployed, access the application by navigating to the appropriate service endpoint in your web browser. The application allows you to interact with your portfolio by adding, updating, and deleting projects.


## Contributing

Contributions to this project are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any questions or feedback, feel free to reach out:

-   **GitHub**: [Gv3N](https://github.com/Gv3N)
-   **Email**: baktajivan@gmail.com

Thank you for checking out the K8sPortfolio project!

