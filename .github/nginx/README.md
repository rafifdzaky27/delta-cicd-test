# Nginx Configuration Files for DELTA

This directory contains Nginx configuration templates for staging and production environments.

## Installation

Copy these files to your server and enable them:

```bash
# On the server
sudo cp nginx-staging.conf /etc/nginx/sites-available/delta-staging
sudo cp nginx-production.conf /etc/nginx/sites-available/delta-production

# Enable sites
sudo ln -s /etc/nginx/sites-available/delta-staging /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/delta-production /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Configuration Details

- **Staging**: Listens on port 8081, serves from `/var/www/delta-staging`
- **Production**: Listens on port 80, serves from `/var/www/delta-production`

Both configurations include:
- Gzip compression
- Static asset caching
- Security headers
- SPA routing support (fallback to index.html)
