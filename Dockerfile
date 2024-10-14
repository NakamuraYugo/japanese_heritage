# Rubyのバージョン指定
FROM ruby:2.7.4

# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install -y default-mysql-client && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn && \
    apt-get install -y vim
# 作業ディレクトリの設定
WORKDIR /japanese-heritage

# GemfileとGemfile.lockをコピー
COPY Gemfile /japanese-heritage/Gemfile
COPY Gemfile.lock /japanese-heritage/Gemfile.lock

# Gemのインストール
RUN bundle install

# アプリケーションのコードをコピー
COPY . /japanese-heritage

# コンテナが起動するたびに実行されるスクリプトを追加する
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# コンテナがリッスンするポート番号
EXPOSE 3000

# コンテナ起動時に実行されるコマンド
CMD ["rails", "server", "-b", "0.0.0.0"]

