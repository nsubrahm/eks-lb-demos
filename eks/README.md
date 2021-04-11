
# Cluster set-up

The following instructions launch an Amazon EKS cluster named `lb-demos` with Container Insights enabled.

## Cluster set-up with AWS LoadBalancer Controller

1. Create IAM policy to allow the worker nodes access ALB and NLB resources.

```bash
curl -o iam-policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.1.2/docs/install/iam_policy.json
aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam-policy.json
rm iam-policy.json
```

2. Edit `eks/cluster.yaml` for `accountId`.

3. Launch cluster.

```bash
cd eks
eksctl create cluster -f cluster-alb.yaml
```

4. Install AWS LoadBalancer Controller.

```bash
helm repo add eks https://aws.github.io/eks-charts
helm install -n kube-system aws-load-balancer-controller eks/aws-load-balancer-controller --set clusterName=lb-demos --set serviceAccount.create=false
```

5. Install Container Insights `DaemonSet`.

```bash
./ci.sh lb-demos ap-south-1
```

6. Set expiry of CloudWatch log groups to 1 day to avoid charges. Some of the log groups may not be up immediately up. For such log groups, the `aws logs put-retention-policy` command would fail. The same command can be tried later.

```bash
aws logs put-retention-policy --log-group-name /aws/eks/lb-demos/cluster --retention-in-days 1
aws logs put-retention-policy --log-group-name /aws/containerinsights/lb-demos/application --retention-in-days 1
aws logs put-retention-policy --log-group-name /aws/containerinsights/lb-demos/host --retention-in-days 1
aws logs put-retention-policy --log-group-name /aws/containerinsights/lb-demos/performance --retention-in-days 1
aws logs put-retention-policy --log-group-name /aws/containerinsights/lb-demos/dataplane --retention-in-days 1
```

## Cluster set-up without AWS LoadBalancer Controller

1. Edit `eks/cluster.yaml` for `accountId`.

2. Launch cluster.

```bash
cd eks
eksctl create cluster -f cluster.yaml
```
