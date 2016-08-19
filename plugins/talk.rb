module Jekyll
  class SlideShare < Liquid::Tag

    def initialize(name, id, tokens)
      super
      @id = id
    end

    def render(context)
      %(<iframe src="http://www.slideshare.net/slideshow/embed_code/#{@id}" width="595" height="446" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen></iframe> )
    end
  end

  class Talk < Liquid::Tag
    @talk = nil

    @youtube = nil
    @slideshare = nil
    @date = nil
    @info = nil

    def initialize(name, id, tokens)
      super
      # attributes = ['info', 'youtube', 'slideshare', 'date']
      # @talk = attributes.reduce({}) { |talk, attr| talk[attr] = $~[attr].strip if $~[attr]; talk }

      url = markup.lines.first
      if url =~ /youtube/
        @youtube = url
      else
        @slideshare = url
      end

      @date = markup.lines.second
      @info = markup.lines[2..-1].join("\n")
    end

    def render(context)

      if @slideshare
        output = "<div class='talk'>"
        output += "<div class='media'>
        (<iframe src='//www.slideshare.net/slideshow/embed_code/key/fioxm0WK0U2mru'
         width='595' height='446' frameborder='0' marginwidth='0' marginheight='0'
          scrolling='no' style='border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px'
           allowfullscreen></iframe> )</div>"

        output += "<div class='info'> #{@info} </div>"
        output += "</div>"
      end

    end
  end
end

Liquid::Template.register_tag('talk', Jekyll::Talk)
