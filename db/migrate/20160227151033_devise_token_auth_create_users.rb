class DeviseTokenAuthCreateUsers < ActiveRecord::Migration
  def change
    change_table(:users) do |t|
      ## Tokens
      t.json :tokens

    end

    add_index :users, [:uid, :provider],     :unique => true
    # add_index :users, :confirmation_token,   :unique => true
    # add_index :users, :unlock_token,         :unique => true
  end
end
