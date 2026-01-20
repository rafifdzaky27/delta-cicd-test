#!/bin/bash

###############################################################################
# DELTA Deployment Script
# 
# This script handles deployment of the DELTA application to staging or
# production environments with automatic backup and rollback capabilities.
#
# Usage: ./deploy.sh [staging|production]
###############################################################################

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENV=$1
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Function to print colored output
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Validate environment argument
if [ "$ENV" != "staging" ] && [ "$ENV" != "production" ]; then
    print_error "Invalid environment specified"
    echo "Usage: $0 [staging|production]"
    exit 1
fi

# Set environment-specific variables
if [ "$ENV" = "staging" ]; then
    DEPLOY_DIR="/var/www/delta-staging"
    BACKUP_DIR="/var/www/backups/staging"
    MAX_BACKUPS=5
    PORT=8081
elif [ "$ENV" = "production" ]; then
    DEPLOY_DIR="/var/www/delta-production"
    BACKUP_DIR="/var/www/backups/production"
    MAX_BACKUPS=10
    PORT=80
fi

print_info "Starting deployment to $ENV environment..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create backup directory if it doesn't exist
print_info "Preparing backup directory..."
mkdir -p "$BACKUP_DIR"

# Backup current deployment if exists
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
    print_info "Creating backup of current deployment..."
    BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"
    
    if tar -czf "$BACKUP_FILE" -C "$DEPLOY_DIR" . 2>/dev/null; then
        BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
        print_success "Backup created: backup_$TIMESTAMP.tar.gz ($BACKUP_SIZE)"
    else
        print_warning "Backup creation failed, but continuing..."
    fi
    
    # Keep only last N backups
    print_info "Cleaning old backups (keeping last $MAX_BACKUPS)..."
    cd "$BACKUP_DIR"
    ls -t | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm
    BACKUP_COUNT=$(ls -1 | wc -l)
    print_success "Current backups: $BACKUP_COUNT"
else
    print_warning "No existing deployment found, skipping backup"
fi

# Verify deployment directory exists
print_info "Preparing deployment directory..."
mkdir -p "$DEPLOY_DIR"

print_success "Deployment preparation complete!"
echo ""
print_info "Deploy directory: $DEPLOY_DIR"
print_info "Backup directory: $BACKUP_DIR"
print_info "Port: $PORT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Display rollback instructions
echo ""
print_info "Rollback Instructions:"
echo "If you need to rollback, run:"
echo "  cd $BACKUP_DIR"
echo "  ls -lht  # Find the backup to restore"
echo "  tar -xzf backup_TIMESTAMP.tar.gz -C $DEPLOY_DIR"
echo ""

print_success "Ready for deployment! 🚀"
