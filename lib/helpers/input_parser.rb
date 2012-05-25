# helpers for parsing and validating input
module StatsdServer
  module InputParser
    def parse_metrics
      metrics = params[:metrics]
      metrics = [metrics] unless Array === metrics

      metrics.tap { |list| list.reject! { |m| m.nil? || m.empty? } }
    end

    def parse_time_range
      start, stop = params[:start], params[:stop]

      if start.nil? && stop.nil?
        now = Time.now.to_i
        lvl = retention_levels[0][1] * 60

        [ now - lvl, now ]

      else
        [start.to_i, stop.to_i].tap do |range|
          if range[0] <= 0 || range[1] <= 0 || range[0] >= range[1]
            return nil
          end
        end
      end
    end
  end
end
