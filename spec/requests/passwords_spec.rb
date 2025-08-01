# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Passwords", type: :request do
  let(:user) { create(:user) }

  before do
    sign_in_as user
  end

  describe "GET /edit" do
    it "returns http success" do
      get edit_password_url
      expect(response).to have_http_status(:success)
    end
  end

  describe "PATCH /update" do
    context "with valid password challenge" do
      it "updates the password and redirects to the root url" do
        patch password_url, params: {password_challenge: "Secret1*3*5*", password: "Secret6*4*2*", password_confirmation: "Secret6*4*2*"}
        expect(response).to redirect_to(root_url)
      end
    end

    context "with invalid password challenge" do
      it "does not update the password and returns unprocessable entity" do
        patch password_url, params: {password_challenge: "SecretWrong1*3", password: "Secret6*4*2*", password_confirmation: "Secret6*4*2*"}
        expect(response).to have_http_status(:unprocessable_content)
        expect(response.body).to include("Password challenge is invalid")
      end
    end
  end
end
