# About this blog
SlackOps is a simple blog with some not-so-simple convenience features
implemented with the cutting-edge Javascript frameworks React and Redux.

## In the beginning
The whole thing started as a simple exercise in building a rails app. I had built
Michael Hartl's outstanding [Rails Tutorial](http://railstutorial.org)
application, which basically every new Rails guy should do. And then I needed
a follow-up, something to practice on.

I ultimately settled on
[the blog engine from RailsGuides](http://guides.rubyonrails.org/getting_started.html),
because it was easy to find, mostly. It was easy to follow, too, since all you
have to do in this guide is set up simple CRUD (Create, Read, Update, Delete)
functionality, which Rails can more-or-less do for you.

Then I ran into the implementation of comments:

```
class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :commenter
      t.text :body
      t.references :article, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
```

I've hung around on my fair share of blogs, and I know that you can't just
represent a commenter as a simple text string. I had witnessed
[a blog](http://eschatonblog.com) with a blowhard who went by 'Al', who spawned
satiric imitators, and after a while, comment threads would degenerate into
speculation over whether a comment came from the Real Al or the Fake Al -- and
eventually whether it was The Real Fake Al or a Fake Fake Al. You have to have a
way to allow people to put a stamp on their commentary.

## The plot thickens
A clean, simple authentication system was called for, and Plataformatec's
Devise gem filled the bill. In combination with the outstanding authorization
software Pundit, I soon had a fully functional set of roles for my blog: users
who could own their own comments, editors who could clean up the comment threads
of their own stories and edit those stories, and admins who could do whatever
they wanted.

I could have stopped there, but then I just would have had to find yet another
'Getting Started' project, so instead I went looking for ways to make SlackOps
more comfortable to use.
