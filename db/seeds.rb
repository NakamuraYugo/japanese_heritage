# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
srand 1234
Faker::Config.random = Random.new(1234)
Faker::UniqueGenerator.clear

ActiveRecord::Base.logger = Logger.new(STDOUT)
Faker::Config.locale = :ja
# 特定のユーザーを作成、そのユーザーのスポットを作成
specific_user = User.find_or_create_by!(email: 'hhh@sample.com') do |u|
  u.name     = 'HHH'
  u.password = 'hhhhhh'
end

15.times do
  spot = specific_user.spots.build(
    name:        Faker::Address.city + Faker::Lorem.characters(number: 4),
    description: Faker::Lorem.paragraph(sentence_count: 3)
  )

  rand(1..3).times do
    path = Rails.root.join('db/fixtures/images', "sample#{rand(1..2)}.jpg")
    File.open(path) { |f| spot.images.build(name: f) }
  end

  spot.save!
end

# 開発用ユーザー 10 人
10.times do |n|
  user = User.create!(
    name:  "ユーザー#{n + 1}",
    email: Faker::Internet.unique.email,
    password: 'password'
  )

  rand(3..8).times do
    spot = user.spots.build(
      name:        Faker::Address.city + Faker::Lorem.characters(number: 4),
      description: Faker::Lorem.paragraph(sentence_count: 4)
    )

    rand(1..4).times do
      path = Rails.root.join('db/fixtures/images', "sample#{rand(1..2)}.jpg")
      File.open(path) { |f| spot.images.build(name: f) }
    end

    begin
      spot.save!
    rescue ActiveRecord::RecordInvalid => e
      warn "⚠ Seed warning: could not save spot ##{spot.object_id}: #{e.record.errors.full_messages.join(", ")}"
    end
  end
end

Faker::UniqueGenerator.clear
