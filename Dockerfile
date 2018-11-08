FROM microsoft/dotnet:2.1.301-sdk AS builder
WORKDIR /source

RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY *.csproj .
RUN dotnet restore

COPY ./ ./
COPY nginx.conf.sigil .

RUN dotnet publish "./secretmenu.csproj" --output "./dist" --configuration Release --no-restore

FROM microsoft/dotnet:2.1.1-aspnetcore-runtime
WORKDIR /app
COPY --from=builder /source/dist .
EXPOSE 80
ENTRYPOINT ["dotnet", "secretmenu.dll"]