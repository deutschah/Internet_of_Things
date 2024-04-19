ARG SDK_VERSION=8.0
ARG RUNTIME_VERSION=8.0

FROM mcr.microsoft.com/dotnet/sdk:${SDK_VERSION} AS build
WORKDIR /app

COPY *.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:${RUNTIME_VERSION}
WORKDIR /app

COPY --from=build /app/out .

EXPOSE 80

ENTRYPOINT ["dotnet", "dotNet_IOT.dll"]
