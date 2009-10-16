module NavigationHelpers
  def path_to(page_name)
    case page_name
    when /start page/
      '/hejhej/_design/hejhej/index.html'
    else
      raise "Can't find mapping from \"#{page_name}\" to a path."
    end
  end
end

World(NavigationHelpers)
