# frozen_string_literal: true

module AuthenticationHelpers
  extend ActiveSupport::Concern

  def sign_in_as(user)
    session = user.sessions.create!

    request = ActionDispatch::Request.new(Rails.application.env_config)
    cookies = request.cookie_jar
    cookies.signed.permanent[:session_token] = {value: session.id, httponly: true}
  end

  def sign_out
    request = ActionDispatch::Request.new(Rails.application.env_config)
    cookies = request.cookie_jar
    cookies.delete(:session_token)
  end
end
