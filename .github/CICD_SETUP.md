# 🚀 CI/CD Setup Instructions

Quick start guide for setting up and using the CI/CD pipeline for DELTA project.

## ✅ Prerequisites Checklist

Before using the CI/CD pipeline, ensure you have completed:

- [x] Server setup following `server_setup_guide.md`
- [x] Created GitHub Environments (`staging` and `production`)
- [ ] Added required GitHub Secrets
- [ ] Tested SSH connection from local machine

## 📝 Step-by-Step Setup

### 1. Add GitHub Secrets

Go to your repository: **Settings > Secrets and variables > Actions > New repository secret**

Add the following secrets:

| Secret Name | Value | How to Get |
|------------|-------|------------|
| `SSH_PRIVATE_KEY` | Your SSH private key | `cat ~/.ssh/delta_deploy` (Windows: `type $HOME\.ssh\delta_deploy`) |
| `SSH_HOST` | `172.104.61.233` | Server IP address |
| `SSH_USERNAME` | `deploy` | SSH username created during server setup |
| `SSH_PORT` | `22` | Default SSH port |
| `DEPLOY_PATH_STAGING` | `/var/www/delta-staging` | Staging deployment path |
| `DEPLOY_PATH_PRODUCTION` | `/var/www/delta-production` | Production deployment path |

### 2. Configure GitHub Environments

#### Staging Environment
1. Go to **Settings > Environments**
2. Click **New environment**
3. Name: `staging`
4. No protection rules needed (auto-deploy)
5. Click **Configure environment**

#### Production Environment
1. Go to **Settings > Environments**
2. Click **New environment**
3. Name: `production`
4. **Enable**: Required reviewers
5. **Add yourself** as required reviewer
6. **Optional**: Set wait timer (e.g., 5 minutes)
7. Click **Save protection rules**

### 3. Test CI Workflow

Push any change to trigger CI:

```bash
git add .
git commit -m "test: trigger CI workflow"
git push
```

Go to **Actions** tab and verify:
- ✅ Lint job passes
- ✅ Build job passes (both Node 18 and 20)
- ✅ Security audit completes

### 4. Test Staging Deployment

Merge a PR to `main` branch or push directly:

```bash
git checkout main
git merge your-feature-branch
git push
```

This will automatically:
1. Build the application
2. Deploy to staging server (port 8081)
3. Create backup
4. Run health check

**Verify**: Visit http://172.104.61.233:8081

### 5. Deploy to Production

#### Via GitHub UI:
1. Go to **Actions** tab
2. Select **CD - Deploy to Production**
3. Click **Run workflow**
4. Type `deploy` in confirmation field
5. Click **Run workflow**
6. **Approve** the deployment when prompted

#### Via Git Tag:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

**Verify**: Visit http://172.104.61.233

## 🔄 Common Workflows

### Making Changes

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature

# 3. Create Pull Request on GitHub
# CI will run automatically

# 4. After PR approved, merge to main
# Staging deployment will trigger automatically

# 5. Test on staging: http://172.104.61.233:8081

# 6. Deploy to production manually via GitHub Actions
```

### Rollback Production

If something goes wrong:

```bash
# SSH to server
ssh -i ~/.ssh/delta_deploy deploy@172.104.61.233

# List available backups
cd /var/www/backups/production
ls -lht

# Restore from backup
tar -xzf backup_TIMESTAMP.tar.gz -C /var/www/delta-production

# Verify
curl http://172.104.61.233
```

### View Deployment Logs

1. Go to **Actions** tab
2. Click on the workflow run
3. Click on the job (e.g., "Deploy to Staging Environment")
4. Expand steps to see detailed logs

## 🔍 Troubleshooting

### CI Fails on Lint

```bash
# Run locally first
npm run lint

# Fix issues
npm run lint -- --fix

# Commit and push
git add .
git commit -m "fix: lint errors"
git push
```

### Deployment Fails - SSH Connection

Check secrets are correct:
- Verify `SSH_PRIVATE_KEY` includes `-----BEGIN` and `-----END` lines
- Verify `SSH_HOST` is correct IP
- Test SSH manually: `ssh -i ~/.ssh/delta_deploy deploy@172.104.61.233`

### Deployment Fails - Permission Denied

On server, check permissions:
```bash
ls -la /var/www/delta-staging
ls -la /var/www/delta-production

# Should be owned by 'deploy' user
# If not, fix with:
sudo chown -R deploy:deploy /var/www/delta-staging
sudo chown -R deploy:deploy /var/www/delta-production
```

### Health Check Fails

Check Nginx is running:
```bash
sudo systemctl status nginx

# If not running:
sudo systemctl start nginx

# Check configuration:
sudo nginx -t
```

## 📊 Monitoring

### Check Deployment Status

- **GitHub Actions**: See all workflow runs and their status
- **Staging URL**: http://172.104.61.233:8081
- **Production URL**: http://172.104.61.233

### Server Logs

```bash
# SSH to server
ssh -i ~/.ssh/delta_deploy deploy@172.104.61.233

# Nginx access logs
sudo tail -f /var/log/nginx/delta-staging-access.log
sudo tail -f /var/log/nginx/delta-production-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/delta-staging-error.log
sudo tail -f /var/log/nginx/delta-production-error.log
```

## 🎯 Best Practices

1. **Always test on staging first** before deploying to production
2. **Use Pull Requests** for code review and automatic CI checks
3. **Tag releases** for production deployments (e.g., v1.0.0, v1.1.0)
4. **Monitor health checks** after each deployment
5. **Keep backups** - they're created automatically but verify they exist
6. **Review Dependabot PRs** weekly to keep dependencies updated

## 🆘 Emergency Contacts

If CI/CD is completely broken:

1. **Manual deployment**: SSH to server and deploy manually
2. **Disable workflows**: Go to Actions > Select workflow > Disable
3. **Rollback**: Use backup files on server
4. **Contact**: Your team lead or DevOps engineer

---

**Need help?** Check the comprehensive guides:
- Server Setup: See artifact `server_setup_guide.md`
- Implementation Details: See artifact `implementation_plan.md`
