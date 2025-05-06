FROM --platform=linux/amd64 quay.io/keycloak/keycloak:23.0 AS builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

# for demonstration purposes only, please make sure to use proper certificates in production instead
CMD ["/opt/keycloak/bin/kc.sh build"]

FROM --platform=linux/amd64 quay.io/keycloak/keycloak:23.0
COPY --from=builder /opt/keycloak/ /opt/keycloak/


ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
