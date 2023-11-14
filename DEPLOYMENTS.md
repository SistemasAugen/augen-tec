# Deployments steps

```shell
# build image
> docker build . -t augen/augentecdotcom
# create container with recently created image
> docker run --name augentecdotcom -d -p 80:3000 augen/augentecdotcom
```

Most probably there is already a `augentecdotcom` container running, stop it with `docker stop augentecdotcom && docker rm augentecdotcom`. Then just create the container again.

After all steps, we should have the new version in `augentec.com` and `143.198.131.61`