FROM docker.io/bcgovdevopsps/patroni-postgres:12.4-latest
USER root
RUN apt-get update
RUN apt install python3-pip
RUN pip3 install pyyaml
CMD ["/bin/bash", "/usr/bin/entrypoint.sh"]