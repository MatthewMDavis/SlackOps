# About this blog
SlackOps is a simple blog with some not-so-simple convenience features
implemented with the cutting-edge Javascript frameworks [React](http://facebook.github.io/react/) and [Redux](http://redux.js.org/).

## In the beginning
The whole thing started as a simple exercise in building a rails app. I had
learned a lot building [my own instance](https://theback140.herokuapp.com/) of
Michael Hartl's outstanding [Rails Tutorial](http://railstutorial.org)
application, which basically every new Rails guy should do. And then I needed a
follow-up, something to practice on.

I ultimately settled on
[the blog engine from RailsGuides](http://guides.rubyonrails.org/getting_started.html),
primarily because it was easy to find. It was easy to follow, too, since all you
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
[a blog](http://eschatonblog.com) with a resident blowhard who went by 'Al', who
spawned satiric imitators: after a while, comment threads would degenerate into
speculation over whether a comment came from the Real Al or the Fake Al -- and
eventually whether it was The Real Fake Al or a Fake Fake Al. You have to have a
way to allow people to put a stamp on their commentary.

## The plot thickens
A clean, simple authentication system was called for, and [Plataformatec's
Devise gem](https://github.com/plataformatec/devise) filled the bill. Devise
provides very close to a turnkey authentication system that integrates easily
with an existing Rails user model, and in combination with the outstanding
authorization software [Pundit](https://github.com/elabs/pundit), I soon had a
fully functional set of roles for my blog: users who could own their own
comments, editors who could clean up the comment threads of their own stories
and edit those stories, and admins who could do whatever they wanted.

I could have stopped there, but then I just would have had to find yet another
'Getting Started' project, so instead I went looking for ways to make SlackOps
more comfortable to use:

### Authentication Enhancements
- I added Facebook login. A lot of people don't want to create a new online
  identity, and I think I would be fooling myself to think that the ability to
  leave a comment here at SlackOps would be so compelling that people would
  always do it.
- I made the UI change, including the navigation available at the top of the
  page, and the presence or absence of a commenting form on each blog page,
  based on whether the user has authenticated -- without the user ever leaving
  the page. Whether through Facebook or through the site's own Devise
  authentication, everything happens through popup windows or modal dialogs that
  minimize the distraction from the comment thread s/he hopefully wants to join.

### Commenting Enhancements
- Rather than giving users a WYSIWYG editor for comments, I allowed them to use
  rudimentary Markdown. To help them see what their comment would look like,
  they get a preview, which is helpfully rendered in the same spot where that
  comment would appear when they finally hit 'Submit.'
- Because I have experience leaving comments and immediately regretting
  something I said, I provided a five-minute 'cooling off period' during which
  commenters may delete a comment. I think it's probably bad to allow users to
  change/delete their posts forever, because you run into so many instances
  where somebody downthread replies to something they've said, and the reply no
  longer makes any sense. In the future, I will probably retool this feature to
  permit edits rather than simply the brute force of a delete; I need to
  consider how the UI would work.

## The learning curve
Implementing AJAX commenting with JQuery was pretty simple, but once I realized
that I wanted to update the UI in a few places at once based on the user's
authentication status, I knew I would want something more structured.

I remade all the portions of the site where I planned to have dynamic
functionality with React components, and then hooked those components up to a
Redux store which I hooked up in turn to the Rails backend. Although React
provides a very simple Rails helper for embedding components in an existing
Rails app, I went to the [React On
Rails](https://github.com/shakacode/react_on_rails) gem for a more full-featured
solution, one which handles all the plumbing of embedding a Redux store, and
providing a Webpack bundle of all of the client-side code to the Rails assets
pipeline.

Honestly, although wiring up all the connections between Redux and React seems
daunting at first blush, it all makes so much sense I don't think I'd want to
use anything else for a Javascript-driven app of any complexity at all.

Knowing what I know now, I understand why a lot of people have moved toward
using Rails to fuel the API, and handling all the interface pieces separately in
Javascript. Working the dynamic elements into a pre-existing Rails application
that was intended to adhere to a RESTful design was certainly a challenge.  One
benefit of working the way I did, however, is that if somebody is browsing the
site with no Javascript, there is still a navigable skeleton of the blog index
and article pages which allows them to read the content.
