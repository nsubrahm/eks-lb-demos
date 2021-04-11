
AWS NLB with target type `ip`

## Application set-up

1. Create Amazon ECR repository.

```bash
aws ecr create-repository --repository-name lb-demos/demo1 --image-scanning-configuration scanOnPush=true --tags Key=project,Value=eks-saga Key=projectType,Value=demo --query 'repository.repositoryArn' --output text
```

2. Build and push image.

```bash
cd app/src
REGION_ID=ap-south-1
ACCOUNT_ID=463113836977
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 463113836977.dkr.ecr.ap-south-1.amazonaws.com
docker build -t 463113836977.dkr.ecr.ap-south-1.amazonaws.com/lb-demos/demo1:latest . && docker push 463113836977.dkr.ecr.ap-south-1.amazonaws.com/lb-demos/demo1:latest
```

## Deploy

1. Edit `app/yaml/demo.yaml` for the `image` URI as generated in the previous step.

```bash
cd app/yaml
kubectl create -f demo.yaml
```
